import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig, appConfig } from '@config/app.config';
import { Logger } from '@nestjs/common';

declare const module: any;


async function server() {
    const app = await NestFactory.create(AppModule);
    app.enableCors()
    const cfg = app.get<AppConfig>(appConfig.KEY);

    await app.listen(cfg.port);
    Logger.log(`Server running at ${await app.getUrl()}`);
    
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
}
server();
