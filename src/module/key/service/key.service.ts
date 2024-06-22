import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { KeyDocument, Key } from '@module/key/schema/key.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateKeyDto } from '@module/key/dto/key.dto';

@Injectable()
export class KeyService {
    constructor(
        @InjectModel(Key.name)
        private KeyModel: Model<KeyDocument>,
    ) {}

    async createKey(keyDto: CreateKeyDto) {
        const filter = { shop: keyDto.shopId };
        const update = {
            ...keyDto,
            refreshTokenUsed: [],
        };
        const option = { new: true, upsert: true };

        const keys = await this.KeyModel.findOneAndUpdate(
            filter,
            update,
            option,
        );

        return keys ? keys.publicKey : null;
    }

    async deleteKeyById(_id: any) {
        return await this.KeyModel.deleteOne({ _id });
    }
}
