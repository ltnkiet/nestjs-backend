import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Inventory, InventorySchema } from './entity/invent.schema';
// import { InventoryRepository } from './entity/invent.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Inventory.name,
                schema: InventorySchema,
            },
        ]),
    ],
    controllers: [],
    // providers: [InventoryRepository],
    exports: [MongooseModule],
})
export class InventoryModule {}
