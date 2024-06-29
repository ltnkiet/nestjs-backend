import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SKU, SKUSchema } from './entity/sku.schema';
import { KeyModule } from '@module/key/key.module';
import { SKUService } from './sku.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: SKU.name,
                schema: SKUSchema,
            },
        ]),
        KeyModule,
    ],
    providers: [SKUService],
    exports: [MongooseModule, SKUService],
})
export class SKUModule {}
