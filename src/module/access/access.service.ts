import {
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AccessRepository } from '@module/access/access.repository';
import { KeyService } from '@module/key/key.service';
import { Shop, ShopDocument } from '@module/shop/schema/shop.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { LoginShopDto, RegisterShopDto } from '@module/shop/dto/shop.dto';
import * as crypto from 'crypto';
import { CreateKeyDto } from '@module/key/dto/key.dto';
import {
    CreateTokenDto,
    HandleRefreshTokenDto,
} from '@module/access/dto/access.dto';
import { BaseResult } from '@helper/base-result';
import { ROLES } from '@enum/role.enum';

@Injectable()
export class AccessService {
    constructor(
        /**
         * @description - Contructor of Access Service
         * @param {AccessRepository} accessRepository - the Access Repository instance
         * @param {KeyService} keyService - the Key Service instance
         */
        private readonly accessRepository: AccessRepository,
        private readonly keyService: KeyService,

        @InjectModel(Shop.name)
        private ShopModel: Model<ShopDocument>,
    ) {}

    /**
     * @description - register shop with the register data transfer object
     * @param shopData - the regitser data transfer object
     * @returns
     */
    async register(shopData: RegisterShopDto) {
        const result = new BaseResult();

        const holderShop = await this.ShopModel.findOne({
            email: shopData.email,
        }).lean();
        if (holderShop) {
            throw new ForbiddenException('Shop already exist');
        }

        const hashPass = await hash(shopData.password, 10);
        const newShop = await this.ShopModel.create({
            ...shopData,
            password: hashPass,
            roles: [ROLES.Shop],
        });

        if (newShop) {
            const privateKey = crypto.randomBytes(64).toString('hex');
            const publicKey = crypto.randomBytes(64).toString('hex');

            const keyDto: CreateKeyDto = {
                shopId: newShop._id,
                publicKey,
                privateKey,
                refreshToken: '',
            };
            const keyStore = await this.keyService.createKey(keyDto);
            if (!keyStore) {
                throw new UnauthorizedException('KeyStore Error');
            }

            const tokenDto: CreateTokenDto = {
                payload: {
                    shopId: newShop._id,
                    email: shopData.email,
                },
                publicKey,
                privateKey,
            };
            const tokens =
                await this.accessRepository.createTokenPair(tokenDto);

            result.data = { newShop, tokens };
            return result;
        }
    }

    async login(shopData: LoginShopDto) {
        const result = new BaseResult();

        const foundShop = await this.ShopModel.findOne({
            email: shopData.email,
        }).lean();
        if (!foundShop) {
            throw new UnauthorizedException('Shop is not registed');
        }

        const matchPass = await compare(shopData.password, foundShop.password);
        if (!matchPass) {
            throw new UnauthorizedException('Password is not correct');
        }

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const { _id: shopId } = foundShop;
        const tokenDto: CreateTokenDto = {
            payload: {
                shopId,
                email: shopData.email,
            },
            publicKey,
            privateKey,
        };
        const token = await this.accessRepository.createTokenPair(tokenDto);

        const keyDto: CreateKeyDto = {
            shopId,
            privateKey,
            publicKey,
            refreshToken: token.refreshToken,
        };
        await this.keyService.createKey(keyDto);

        result.data = { foundShop, token };
        return result;
    }

    async logout(keyStore: any) {
        const delKey = await this.keyService.deleteKeyById(keyStore._id);
        return delKey;
    }

    async handleRefreshToken(tokenDto: HandleRefreshTokenDto) {
        const result = new BaseResult();
        const { shopId, email } = tokenDto.shop;

        if (
            tokenDto.keyStore.refreshTokenUsed.includes(tokenDto.refreshToken)
        ) {
            await this.keyService.deleteKeyById(shopId);
            throw new ForbiddenException('Something went wrong');
        }

        if (tokenDto.keyStore.refreshToken !== tokenDto.refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const foundShop = await this.ShopModel.findOne({ email }).lean();
        if (!foundShop) throw new UnauthorizedException('Shop not registered');

        const payload: CreateTokenDto = {
            payload: {
                shopId,
                email,
            },
            publicKey: tokenDto.keyStore.publicKey,
            privateKey: tokenDto.keyStore.privateKey,
        };
        const tokens = await this.accessRepository.createTokenPair(payload);

        await this.keyService.updateKeyById(tokenDto.keyStore._id, {
            $set: {
                refreshToken: tokens.refreshToken,
            },
            $addToSet: {
                refreshTokenUsed: tokenDto.refreshToken,
            },
        });

        result.data = {
            shop: tokenDto.shop,
            tokens,
        };
        return result;
    }
}
