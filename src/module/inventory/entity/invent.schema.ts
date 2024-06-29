import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type InventoryDocument = HydratedDocument<Inventory>;

@Schema({ collection: 'Inventory', timestamps: true })
export class Inventory {
    @Prop({ type: Types.ObjectId, ref: 'Product' })
    invent_product_id: string;

    @Prop({ default: 'unknown' })
    invent_location: string

    @Prop({ required: true })
    invent_stock: number

    @Prop({ type: Types.ObjectId, ref: 'Shop' })
    invent_shop_id: string

    @Prop({ type: Array, default: [] })
    invent_reservation: Array<any>

}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
