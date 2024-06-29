import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SPU, SPUSchema } from './entity/spu.schema';
import { KeyModule } from '@module/key/key.module';
import { SPUService } from './spu.service';
import { ProductModule } from '../product.module';
import { SPUController } from './spu.controller';
import { ShopModule } from '@module/shop/shop.module';
import { SKUModule } from '../sku/sku.module';
import { InventoryModule } from '@module/inventory/invent.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: SPU.name,
                schema: SPUSchema,
            },
        ]),
        KeyModule,
        ProductModule,
        ShopModule,
        SKUModule,
        InventoryModule,
    ],
    controllers: [SPUController],
    providers: [SPUService],
    exports: [MongooseModule, SPUService],
})
export class SPUModule {}
