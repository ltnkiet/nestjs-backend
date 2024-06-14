import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccessRepository } from '../repository/access.repository';
import { KeyService } from '@module/key/service/key.service';
import { Shop, ShopDocument } from '@module/shop/schema/shop.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { RegisterShopDto } from '@module/shop/dto/shop.dto';
import * as crypto from 'crypto';
import { CreateKeyDto } from '@module/key/dto/key.dto';
import { CreateTokenDto } from '../dto/access.dto';

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
        const holderShop = await this.ShopModel.findOne({
            email: shopData.email,
        }).lean();
        if (holderShop) {
            throw new HttpException('Shop alreay', HttpStatus.BAD_REQUEST);
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
                shopId: newShop._id.toString(),
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

            const createTokenDto: CreateTokenDto = {
                payload: {
                    shopId: newShop._id,
                    email: shopData.email,
                },
                publicKey,
                privateKey,
            };
            const tokens =
                await this.accessRepository.createTokenPair(createTokenDto);

            return { newShop, tokens };
        }
    }
}
