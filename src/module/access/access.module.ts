import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessRepository } from './entity/access.repository';
import { KeyService } from '@module/key/key.service';
import { ShopModule } from '@module/shop/shop.module';
import { KeyModule } from '@module/key/key.module';
import { AppConfig, appConfig } from '@config/app.config';

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [appConfig.KEY],
            useFactory: async (config: AppConfig) => ({
                secret: config.jwt.key,
            }),
        }),
        ShopModule,
        KeyModule,
    ],
    controllers: [AccessController],
    providers: [AccessService, JwtService, AccessRepository, KeyService],
})
export class AccessModule {}
