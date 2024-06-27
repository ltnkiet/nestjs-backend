import { Shop } from '@module/shop/schema/shop.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Types, SchemaTypes } from 'mongoose';
import slugify from 'slugify';

export type SPUDocument = HydratedDocument<SPU>;

@Schema({ collection: 'SPU', timestamps: true })
export class SPU {
    @Prop({ default: '' })
    @ApiProperty()
    product_id: string;

    @Prop({ required: true })
    @ApiProperty()
    product_name: string;

    @Prop({})
    @ApiProperty()
    product_slug: string;

    @Prop({ required: true })
    @ApiProperty()
    product_thumb: string;

    @Prop({ type: Array, default: [] })
    @ApiProperty()
    product_category: Array<string>;

    @Prop({ required: true })
    @ApiProperty()
    product_description: string;

    @Prop({ required: true })
    @ApiProperty()
    product_quantity: number;

    @Prop({ required: true })
    @ApiProperty()
    product_price: number;

    @Prop({ type: Types.ObjectId, ref: 'Shop' })
    @ApiProperty()
    product_shop: string | Shop;

    @Prop({ type: SchemaTypes.Mixed, required: true })
    product_attributes: any;
    /*
        {
            attributes_id: 0123 - Màu áo
            attributes_value: [
                value_id: 3456 - [đỏ, cam, vàng, lục, lam, chàm, tím]
            ]
        }
    */
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
    /*
        tier_variantion: [
            {
                image: [],
                name: color,
                option: [đỏ, vàng]
            },
            {
                images: []
                name: size
                option: [S, M, L]

            }
        ]
    */

    @Prop({ default: true, index: true, select: false })
    isDraft: boolean;

    @Prop({ default: true, index: true, select: false })
    isPublished: boolean;

    @Prop({ default: false, index: true, select: true })
    isDeleted: boolean;
}

export const SPUSchema = SchemaFactory.createForClass(SPU);

SPUSchema.index({ product_name: 'text', product_description: 'text' });

SPUSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true });
    next();
});
