import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { KeyModule } from './key/key.module';

@Module({
    imports: [ShopModule, KeyModule],
})
export class ServiceModule {}
