import { Module } from '@nestjs/common';
import { ChatGateway } from './chatGateway';
import { MessageModule } from '../message/messageModule';

@Module({
    imports: [MessageModule],
    providers: [ChatGateway]
})
export class ChatModule {}
