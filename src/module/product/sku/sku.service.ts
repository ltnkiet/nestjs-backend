import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SKU, SKUDocument } from './sku.schema';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';
import { randomProductId } from '@utils/random-id';

@Injectable()
export class SKUService {
    constructor(@InjectModel(SKU.name) private SKUModel: Model<SKUDocument>) {}

    async newSku(spu_id: any, sku_list: Array<any>) {
        const convert_sku_list = sku_list.map((sku: any) => {
            return {
                ...sku,
                product_id: spu_id,
                sku_id: `${spu_id}.${randomProductId()}`,
            };
        });
        const skus = await this.SKUModel.create(convert_sku_list);
        return skus;
    }
}
