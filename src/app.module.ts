import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppConfig, appConfig } from '@config/app.config';
import { IndexModule } from '@module/index.module';

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
        IndexModule,
    ],
})
export class AppModule {}
