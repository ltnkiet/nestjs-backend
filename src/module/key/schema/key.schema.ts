import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type KeyDocument = HydratedDocument<Key>;

@Schema({ collection: 'Key', timestamps: true })
export class Key {
    @Prop({ type: Types.ObjectId, ref: 'Shop', required: true })
    shop: string;

    @Prop({ required: true })
    publicKey: string;

    @Prop({ require: true })
    privateKey: string;

    @Prop({ required: true })
    refreshToken: string;

    @Prop({ type: Array, default: [] })
    refreshTokenUsed: string[];
}

export const KeySchema = SchemaFactory.createForClass(Key);
