import { Module } from '@nestjs/common';
import { Key, KeySchema } from './entity/key.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { KeyService } from './key.service';

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
    exports: [MongooseModule, KeyModule, KeyService],
})
export class KeyModule {}
