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
} from './entity/product.schema';
import { CreateProductDto } from './dto/product.dto';
import { InventoryRepository } from '@module/inventory/entity/invent.repository';

@Injectable()
export class ProductService {
    static productRegistry = {};

    static registerProductType(type: string, classRef: any) {
        ProductService.productRegistry[type] = classRef;
    }

    constructor(
        @InjectModel(Product.name)
        private readonly ProductModel: Model<ProductDocument>,
        @InjectModel(Electronic.name)
        private readonly ElectronicModel: Model<ElectronicDocument>,
        @InjectModel(Clothing.name)
        private readonly ClothingModel: Model<ClothingDocument>,

        private readonly inventRepository: InventoryRepository,
    ) {}

    async createProduct(type: string, payload: any) {
        const productClass = ProductService.productRegistry[type];
        if (!productClass)
            throw new BadRequestException('Invalid product type ');

        const productInstance = new productClass(
            this.ProductModel,
            this.ElectronicModel,
            this.ClothingModel,
            this.inventRepository,
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

        protected readonly inventRepository: InventoryRepository,

        protected createProductDto: CreateProductDto,
    ) {
        this.createProductDto = createProductDto;
    }

    async create(product_id: any) {
        const newProd = await this.ProductModel.create({
            _id: product_id,
            ...this.createProductDto,
        });
        if (newProd) {
            await this.inventRepository.insertInvent({
                product_id: newProd._id,
                shop_id: this.createProductDto.product_shop,
                stock: this.createProductDto.product_quantity,
                location: 'unknown',
            });
        }
        return newProd;
    }
}

class Clothes extends Products {
    async createProduct() {
        const newClothing = await this.ClothingModel.create({
            ...this.createProductDto.product_attributes,
            product_shop: this.createProductDto.product_shop,
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
            ...this.createProductDto.product_attributes,
            product_shop: this.createProductDto.product_shop,
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
