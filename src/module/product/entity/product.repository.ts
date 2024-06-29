import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { InjectModel } from '@nestjs/mongoose';
import { findAllProductDto } from '@module/product/dto/find-all.dto';

export class ProductRepository {
    constructor(
        @InjectModel(Product.name)
        private readonly ProductModel: Model<ProductDocument>
    ) {}

    async findAllProduct(payload: findAllProductDto) {
        const skip = (payload.page - 1) * payload.limit;
        const sortBy = payload.sort === "ctime" ? { _id: -1 as 1 | -1 } : { _id: 1 as 1 | -1 };
        const products = await this.ProductModel
            .find(payload.filter)
            .sort(sortBy)
            .skip(skip)
            .limit(payload.limit)
            .select(payload.select)
            .lean();
        return products
    }
}