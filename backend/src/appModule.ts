import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatModule } from './chat/chatModule';
import { MessageModule } from './message/messageModule';
import { Message } from './message/messageEntity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'chat_user',
            password: 'erterttre',
            database: 'chat_db',
            entities: [Message],
            synchronize: true,
        }),
        ChatModule,
        MessageModule,
    ],
})
export class AppModule {}
