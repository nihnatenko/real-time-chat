import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chatModule';
import { MessageModule } from './message/messageModule';
import { Message } from './message/messageEntity';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.prod' });

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 3306,
            username: process.env.DB_USERNAME || '-',
            password: process.env.DB_PASSWORD || '-',
            database: process.env.DB_NAME || 'chat_db',
            entities: [Message],
            synchronize: true,
        }),
        ChatModule,
        MessageModule,
    ],
})
export class AppModule {}
