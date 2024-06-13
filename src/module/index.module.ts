import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { KeyModule } from './key/key.module';
import { AccessModule } from './access/access.module';

@Module({
    imports: [ShopModule, KeyModule, AccessModule],
})
export class IndexModule {}
