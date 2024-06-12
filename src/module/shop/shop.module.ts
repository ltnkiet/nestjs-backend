import { Module } from '@nestjs/common';
import { ShopSchema, Shop } from './schema/shop.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Shop.name,
                schema: ShopSchema,
            },
        ]),
    ],
})
export class ShopModule {}
