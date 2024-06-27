import { Shop } from '@module/shop/schema/shop.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types, SchemaTypes } from 'mongoose';
import slugify from 'slugify';

export type ProductDocument = HydratedDocument<Product>;
export type ClothingDocument = HydratedDocument<Clothing>;
export type ElectronicDocument = HydratedDocument<Electronic>;

/**
 * PRODUCT SCHEMA
 */
@Schema({ collection: 'Product', timestamps: true })
export class Product {
    @Prop({ required: true })
    @ApiProperty()
    product_name: string;

    @Prop({})
    @ApiProperty()
    product_slug: string;

    @Prop({ required: true })
    @ApiProperty()
    product_thumb: string;

    @Prop({ required: true })
    @ApiProperty()
    product_description: string;

    @Prop({ required: true })
    @ApiProperty()
    product_quantity: number;

    @Prop({ required: true })
    @ApiProperty()
    product_price: number;

    @Prop({ required: true })
    @ApiProperty()
    product_type: string;

    @Prop({ type: Types.ObjectId, ref: 'Shop' })
    @ApiProperty()
    product_shop: string | Shop;

    @Prop({ type: SchemaTypes.Mixed, required: true })
    product_attributes: any;

    @Prop({
        default: 4.5,
        min: [1, 'Rating must be above 1'],
        max: [5, 'Rating must be above 5'],
        set: (val: number) => Math.round(val * 10) / 10,
    })
    @ApiProperty()
    product_ratingAverage: number;

    @Prop({ type: [String], default: [] })
    @ApiProperty()
    product_variation: Array<any>;

    @Prop({ default: true, index: true, select: false })
    isDraft: boolean;

    @Prop({ default: false, index: true, select: true })
    isPublished: boolean;
}

/**
 * Product Type Clothing
 */
@Schema({ collection: 'Clothing', timestamps: true })
export class Clothing {
    @Prop({ required: true })
    brand: string;

    @Prop({ required: true })
    size: string;

    @Prop({ required: true })
    material: string;

    @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
    product_shop: string | Shop;
}

/**
 * Product Type Electronic
 */
@Schema({ collection: 'Electronic', timestamps: true })
export class Electronic {
    @Prop({ required: true })
    manufactuner: string;

    @Prop({ required: true })
    model: string;

    @Prop({ required: true })
    color: string;

    @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
    product_shop: string | Shop;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
export const ClothingSchema = SchemaFactory.createForClass(Clothing);
export const ElectronicSchema = SchemaFactory.createForClass(Electronic);

/**
 * PRODUCT INDEX SEARCH
 */
ProductSchema.index({ product_name: 'text', product_description: 'text' });

/**
 * PRODUCT MIDDLEWARE
 */
ProductSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true });
    next();
});
