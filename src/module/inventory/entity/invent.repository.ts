import { Injectable } from '@nestjs/common';
import { Inventory, InventoryDocument } from './invent.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InserInventoryDto } from '../dto/inser-invent.dto';

@Injectable()
export class InventoryRepository {
    constructor(
        @InjectModel(Inventory.name)
        private InventoryModel: Model<InventoryDocument>,
    ) {}

    async insertInvent(payload: InserInventoryDto) {
        return await this.InventoryModel.create({
            invent_product_id: payload.product_id,
            invent_shop_id: payload.shop_id,
            invent_stock: payload.stock,
            invent_location: payload.location,
        });
    }
}
