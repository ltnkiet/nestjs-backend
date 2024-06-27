import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SPU, SPUSchema } from './schema/spu.schema';
import { KeyModule } from '@module/key/key.module';
import { SPUService } from './spu.service';
import { ProductModule } from '../product.module';
import { SPUController } from './spu.controller';
import { KeyService } from '@module/key/key.service';
import { ShopRepository } from '@module/shop/shop.repository';
import { SKUService } from '../sku/sku.service';
import { ShopModule } from '@module/shop/shop.module';
import { SKUModule } from '../sku/sku.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: SPU.name,
                schema: SPUSchema,
            },
        ]),
        KeyModule, ProductModule, ShopModule, SKUModule
    ],
    controllers: [SPUController],
    providers: [SPUService, KeyService, ShopRepository, SKUService],
    exports: [MongooseModule, SPUService],
})
export class SPUModule {}
