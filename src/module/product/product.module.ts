import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Clothing,
    ClothingSchema,
    Electronic,
    ElectronicSchema,
    Product,
    ProductSchema,
} from './entity/product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { KeyModule } from '@module/key/key.module';
import { InventoryModule } from '@module/inventory/invent.module';
import { InventoryRepository } from '@module/inventory/entity/invent.repository';
import { MediaModule } from './media/media.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema,
            },
            {
                name: Electronic.name,
                schema: ElectronicSchema,
            },
            {
                name: Clothing.name,
                schema: ClothingSchema,
            },
        ]),
        KeyModule,
        InventoryModule,
        MediaModule,
    ],
    controllers: [ProductController],
    providers: [ProductService, InventoryRepository],
    exports: [],
})
export class ProductModule {}
