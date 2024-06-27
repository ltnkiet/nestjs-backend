import { Module } from '@nestjs/common';
import { ShopModule } from './shop/shop.module';
import { KeyModule } from './key/key.module';
import { AccessModule } from './access/access.module';
import { ProductModule } from './product/product.module';
import { SPUModule } from './product/spu/spu.module';

@Module({
    imports: [ShopModule, KeyModule, AccessModule, ProductModule, SPUModule],
})
export class IndexModule {}
