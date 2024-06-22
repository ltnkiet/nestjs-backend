import { Shop } from '@module/shop/schema/shop.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types, SchemaTypes } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

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
    product_variation: Array<string>;

    @Prop({ default: true, index: true, select: false })
    isDraft: boolean;

    @Prop({ default: true, index: true, select: false })
    isPublished: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
