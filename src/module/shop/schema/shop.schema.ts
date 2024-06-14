import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShopDocument = HydratedDocument<Shop>;

enum STATUS {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}

@Schema({ collection: 'Shop', timestamps: true })
export class Shop {
    @Prop()
    name: string;

    @Prop({ unique: true, trim: true })
    email: string;

    @Prop({ require: true })
    password: string;

    @Prop({ enum: STATUS, default: STATUS.Inactive })
    status: string;

    @Prop({ default: false })
    verify: boolean;

    @Prop({ type: [String], default: [] })
    roles: string[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
