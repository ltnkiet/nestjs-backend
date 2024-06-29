import { Injectable } from '@nestjs/common';
import { Shop, ShopDocument } from '@module/shop/entity/shop.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
const { ObjectId } = Types;

@Injectable()
export class ShopRepository {
    constructor(
        @InjectModel(Shop.name)
        private ShopModel: Model<ShopDocument>,
    ) {}

    async findById(id: any) {
        return this.ShopModel.findOne({ _id: new ObjectId(id) });
    }
}
