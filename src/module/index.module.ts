import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { KeyModule } from './key/key.module';
import { AccessModule } from './access/access.module';
import { ProductModule } from './product/product.module';

@Module({
    imports: [ShopModule, KeyModule, AccessModule, ProductModule],
})
export class IndexModule {}
