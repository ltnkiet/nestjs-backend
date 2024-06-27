import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument} from 'mongoose';

export type SKUDocument = HydratedDocument<SKU>;

@Schema({ collection: 'SKU', timestamps: true })
export class SKU {
    @Prop({ required: true, unique: true })
    @ApiProperty()
    sku_id: string;

    @Prop({ type: Array, default: [0] })
    @ApiProperty()
    sku_tier_index: Array<string>;
    /*
        color: [red, green] - [0, 1]
        size: [S, M] - [0, 1]

        => red + S - [0, 0], red + M - [0, 1]
    */

    @Prop({ type: Boolean, default: false })
    @ApiProperty()
    sku_default: boolean;

    @Prop({ default: '' })
    @ApiProperty()
    sku_slug: string;

    @Prop({ default: 0 })
    @ApiProperty()
    sku_sort: number;

    @Prop({ required: true })
    @ApiProperty()
    sku_price: string;

    @Prop({ default: 0 })
    @ApiProperty()
    sku_stock: number;

    @Prop({ required: true })
    @ApiProperty()
    product_id: string;

    @Prop({ default: true, index: true, select: false })
    isDraft: boolean;

    @Prop({ default: false, index: true, select: true })
    isPublished: boolean;

    @Prop({ default: false, index: true, select: true })
    isDeleted: boolean;
}

export const SKUSchema = SchemaFactory.createForClass(SKU);
