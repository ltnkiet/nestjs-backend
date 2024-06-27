import { Module } from '@nestjs/common';
import { ShopSchema, Shop } from './schema/shop.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ShopController } from './shop.controller';
import { ShopRepository } from './shop.repository';

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
    providers: [ShopRepository],
    exports: [MongooseModule, ShopRepository],
})
export class ShopModule {}
