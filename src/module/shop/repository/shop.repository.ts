import { Injectable } from '@nestjs/common';
import { Shop, ShopDocument } from '@module/shop/schema/shop.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ShopRepository {
    constructor(
        @InjectModel(Shop.name) 
        private ShopModel: Model<ShopDocument>,
    ) {}

    async findByEmail() {
        
    }
}
