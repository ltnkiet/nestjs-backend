import { Module } from '@nestjs/common';
import { Key, KeySchema } from './schema/key.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { KeyService } from './service/key.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Key.name,
                schema: KeySchema,
            },
        ]),
    ],
    providers: [KeyService],
    exports: [MongooseModule],
})
export class KeyModule {}
