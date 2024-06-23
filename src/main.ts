import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig, appConfig } from '@config/app.config';
import { BadRequestException, InternalServerErrorException, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@config/app.filter';

declare const module: any;

async function server() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            exceptionFactory: (errors) => new InternalServerErrorException(errors),
        }),
    );

    const cfg = app.get<AppConfig>(appConfig.KEY);

    const doc = new DocumentBuilder()
        .setTitle('Digital Hippo V2 API')
        .addBearerAuth({
            type: 'apiKey',
            scheme: 'JWT',
            name: 'Authorization',
            description: 'Type into the text box: Bearer {your JWT}',
            in: 'header',
        })
        .build();
    const document = SwaggerModule.createDocument(app, doc);
    SwaggerModule.setup('api', app, document);

    await app.listen(cfg.port);
    Logger.log(`Server running at ${await app.getUrl()}`);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
}
server();
