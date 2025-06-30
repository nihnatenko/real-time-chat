import { NestFactory } from '@nestjs/core';
import { AppModule } from './appModule';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: 'http://localhost:63342',
        methods: ['GET', 'POST'],
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
