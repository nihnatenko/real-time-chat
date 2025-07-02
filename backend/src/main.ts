import { NestFactory } from '@nestjs/core';
import { AppModule } from './appModule';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
    dotenv.config({ path: '.env' });
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'POST'],
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    console.log('🚀 Server is running on http://localhost:3000');
}
bootstrap();
