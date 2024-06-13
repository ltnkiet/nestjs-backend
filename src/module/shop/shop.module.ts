import { Module } from '@nestjs/common';
import { ShopSchema, Shop } from './schema/shop.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopController } from './shop/shop.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Shop.name,
                schema: ShopSchema,
            },
        ]),
    ],
    controllers: [ShopController],
})
export class ShopModule {}