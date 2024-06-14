import { Module } from '@nestjs/common';
import { AccessController } from './controllers/access.controller';
import { AccessService } from './service/access.service';
import { JwtService } from '@nestjs/jwt';
import { AccessRepository } from './repository/access.repository';
import { KeyService } from '@module/key/service/key.service';
import { ShopModule } from '@module/shop/shop.module';
import { KeyModule } from '@module/key/key.module';

@Module({
    imports: [ShopModule, KeyModule],
    controllers: [AccessController],
    providers: [AccessService, JwtService, AccessRepository, KeyService],
})
export class AccessModule {}
