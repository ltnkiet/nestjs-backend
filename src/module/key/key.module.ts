import { Module } from '@nestjs/common';
import { Key, KeySchema } from './schema/key.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Key.name,
                schema: KeySchema,
            },
        ]),
    ],
})
export class KeyModule {}
