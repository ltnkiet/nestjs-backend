import { Module } from '@nestjs/common';
import { Discount, DiscountSchema } from './entity/discount.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from '@module/product/product.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Discount.name,
                schema: DiscountSchema,
            },
        ]),
        ProductModule,
    ],
    controllers: [],
    providers: [],
    exports: [MongooseModule],
})
export class DiscountModule {}
