import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig, appConfig } from '@config/app.config';
import { Logger } from '@nestjs/common';

declare const module: any;

async function server() {
    const app = await NestFactory.create(AppModule);
    const cfg = app.get<AppConfig>(appConfig.KEY);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
    await app.listen(cfg.port);
    Logger.log(`Server running at ${await app.getUrl()}`);
}
server();
