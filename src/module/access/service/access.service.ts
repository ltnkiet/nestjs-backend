import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccessRepository } from '@module/access/repository/access.repository';
import { KeyService } from '@module/key/service/key.service';
import { Shop, ShopDocument } from '@module/shop/schema/shop.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { LoginShopDto, RegisterShopDto } from '@module/shop/dto/shop.dto';
import * as crypto from 'crypto';
import { CreateKeyDto } from '@module/key/dto/key.dto';
import { CreateTokenDto, RefreshTokenDto } from '@module/access/dto/access.dto';
import { JwtService } from '@nestjs/jwt';
import { BaseResult } from 'core/base.result';

enum ROLES {
    Shop = 'SHOP',
    Writer = 'WRITER',
    Editor = 'EDITOR',
    Admin = 'ADMIN',
}

@Injectable()
export class AccessService {
    constructor(
        private readonly accessRepository: AccessRepository,
        private readonly keyService: KeyService,

        @InjectModel(Shop.name)
        private ShopModel: Model<ShopDocument>,
    ) {}

    async register(shopData: RegisterShopDto) {
        const result = new BaseResult();
        const holderShop = await this.ShopModel.findOne({
            email: shopData.email,
        }).lean();
        if (holderShop) {
            throw new HttpException('Shop already', HttpStatus.BAD_REQUEST);
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
                throw new HttpException(
                    'KeyStore Error',
                    HttpStatus.BAD_REQUEST,
                );
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
        const result = new BaseResult()

        const foundShop = await this.ShopModel.findOne({
            email: shopData.email,
        }).lean();
        if (!foundShop) {
            throw new HttpException(
                'Shop is not registed',
                HttpStatus.BAD_REQUEST,
            );
        }

        const matchPass = compare(shopData.password, foundShop.password);
        if (!matchPass) {
            throw new HttpException(
                'Password is not correct',
                HttpStatus.UNAUTHORIZED,
            );
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
        return result
    }

    async logout(_id: any) {
        const delKey = await this.keyService.deleteKeyById(_id);
        return delKey;
    }

    async handleRefreshToken(tokenDto: RefreshTokenDto) {
        const { shopId, email } = tokenDto.shop;

        if (
            tokenDto.keyStore.refreshTokenUsed.includes(tokenDto.refreshToken)
        ) {
            await this.keyService.deleteKeyById(shopId);
            throw new HttpException(
                'Something went wrong',
                HttpStatus.FORBIDDEN,
            );
        }
    }
}
