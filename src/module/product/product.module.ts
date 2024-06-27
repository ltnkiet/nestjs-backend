import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Clothing,
    ClothingSchema,
    Electronic,
    ElectronicSchema,
    Product,
    ProductSchema,
} from './schema/product.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { KeyService } from '@module/key/key.service';
import { KeyModule } from '@module/key/key.module';

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
            }
        ]),
        KeyModule
    ],
    controllers: [ProductController],
    providers: [ProductService, KeyService],
    exports: [],
})
export class ProductModule {}
