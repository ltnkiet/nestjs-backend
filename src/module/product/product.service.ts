import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    Product,
    Clothing,
    Electronic,
    ProductDocument,
    ClothingDocument,
    ElectronicDocument,
} from './schema/product.schema';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
    static productRegistry = {};

    static registerProductType(type: string, classRef: any) {
        ProductService.productRegistry[type] = classRef;
    }

    constructor(
        @InjectModel(Product.name)
        private readonly productModel: Model<ProductDocument>,
        @InjectModel(Electronic.name)
        private readonly electronicModel: Model<ElectronicDocument>,
        @InjectModel(Clothing.name)
        private readonly clothingModel: Model<ClothingDocument>,
    ) {}

    async createProduct(type: string, payload: any) {
        const productClass = ProductService.productRegistry[type];
        if (!productClass)
            throw new BadRequestException('Invalid product type ');

        const productInstance = new productClass(
            this.productModel,
            this.electronicModel,
            this.clothingModel,
            payload,
        );

        return await productInstance.createProduct();
    }
}

class Products {
    constructor(
        @InjectModel(Product.name)
        protected readonly ProductModel: Model<ProductDocument>,

        @InjectModel(Electronic.name)
        protected readonly ElectronicModel: Model<ElectronicDocument>,

        @InjectModel(Clothing.name)
        protected readonly ClothingModel: Model<ClothingDocument>,

        protected productDto: ProductDto,
    ) {
        this.productDto = productDto;
    }

    async create(product_id: any) {
        return await this.ProductModel.create({
            _id: product_id,
            ...this.productDto,
        });
    }
}

class Clothes extends Products {
    async createProduct() {
        const newClothing = await this.ClothingModel.create({
            ...this.productDto.product_attributes,
            product_shop: this.productDto.product_shop,
        });
        if (!newClothing)
            throw new BadRequestException('Create Clothing Error');

        const newProduct = await super.create(newClothing._id);
        if (!newProduct) throw new BadRequestException('Create Product Error');

        return newProduct;
    }
}

class Electronics extends Products {
    async createProduct() {
        const newElectronic = await this.ElectronicModel.create({
            product_shop: this.productDto.product_shop,
            ...this.productDto.product_attributes,
        });
        if (!newElectronic)
            throw new BadRequestException('Create Clothing Error');

        const newProduct = await super.create(newElectronic._id);
        if (!newProduct) throw new BadRequestException('Create Product Error');

        return newProduct;
    }
}

ProductService.registerProductType('Clothes', Clothes);
ProductService.registerProductType('Electronics', Electronics);
