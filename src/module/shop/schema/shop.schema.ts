import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type ShopDocument = HydratedDocument<Shop>;

enum STATUS {
    Active = 'ACTIVE',
    Inactive = 'INACTIVE',
}

@Schema({ collection: 'Shop', timestamps: true })
export class Shop {
    @Prop()
    @ApiProperty()
    name: string;

    @Prop({ unique: true, trim: true })
    @ApiProperty()
    email: string;

    @Prop({ require: true })
    @ApiProperty()
    password: string;

    @Prop({ enum: STATUS, default: STATUS.Inactive })
    @ApiProperty()
    status: string;

    @Prop({ default: false })
    @ApiProperty()
    verify: boolean;

    @Prop({ type: [String], default: [] })
    @ApiProperty()
    roles: string[];
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
