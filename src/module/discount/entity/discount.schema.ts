import { DISCOUNT_APPLICES } from '@enum/discount.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type DiscountDocument = HydratedDocument<Discount>;

@Schema({ collection: 'Discount', timestamps: true })
export class Discount {
    @Prop({ required: true })
    discount_name: string;

    @Prop({ required: true })
    discount_description: string;

    @Prop({ required: true })
    discount_type: string;

    @Prop({ required: true })
    discount_value: number;

    @Prop({ required: true })
    discount_code: string;

    @Prop({ type: Date, required: true })
    discount_start_date: string;

    @Prop({ type: Date, required: true })
    discount_end_date: string;

    @Prop({ required: true })
    discount_max_uses: number;

    @Prop({ required: true })
    discount_uses_count: number;

    @Prop({ type: Array, default: [] })
    discount_users_used: Array<string>;

    @Prop({ required: true })
    discount_max_use_per_user: number;

    @Prop({ required: true })
    discount_min_order_value: number;

    @Prop({ type: Types.ObjectId, ref: 'Shop' })
    discount_shop_id: any;

    @Prop({ type: Boolean, default: true })
    discount_is_active: boolean;

    @Prop({ enum: DISCOUNT_APPLICES })
    discount_applies_to: string;

    @Prop({ type: Array, default: [] })
    discount_product_ids: Array<string>;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount);
