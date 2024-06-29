import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SKU, SKUDocument } from './entity/sku.schema';
import { Model } from 'mongoose';
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

    async getOneSku(sku_id: any, product_id: any) {
        const sku = await this.SKUModel.findOne({ sku_id, product_id });
        if (sku) {
        }
        return sku;
    }

    async getAllSkuBySpuId(product_id: any) {
        const skus = await this.SKUModel.find(product_id).lean();
        return skus;
    }
}
