import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceModule } from './module/service.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, appConfig } from '@config/app.config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
        MongooseModule.forRootAsync({
            inject: [appConfig.KEY],
            useFactory: (config: AppConfig) => {
                return {
                    uri: config.database.uri,
                    dbName: config.database.name,
                };
            },
        }),
        ServiceModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
