import { Injectable, NotFoundException } from '@nestjs/common';
import { SPUDto } from './dto/spu.dto';
import { SPU, SPUDocument } from './schema/spu.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShopRepository } from '@module/shop/shop.repository';
import { randomProductId } from '@utils/random-id';
import { SKUService } from '../sku/sku.service';

@Injectable()
export class SPUService {
    constructor(
        @InjectModel(SPU.name) private SPUModel: Model<SPUDocument>,
        private readonly shopRepository: ShopRepository,
        private readonly skuService: SKUService,
    ) {
    }

    async newSpu(data: SPUDto) {
        const foundShop = await this.shopRepository.findById({
            id: data.product_shop,
        });
        if (!foundShop) throw new NotFoundException('Shop not found');

        const spu = await this.SPUModel.create({
            product_id: randomProductId(),
            ...data,
        });

        if (spu && data.sku_list.length > 0) {
            this.skuService.newSku(spu.product_id, data.sku_list).then();
        }

        return !!spu;
    }
}
