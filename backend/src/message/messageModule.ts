import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messageEntity';
import { MessageService } from './messageService';
import { MessageController } from './messageController';

@Module({
    imports: [TypeOrmModule.forFeature([Message])],
    providers: [MessageService],
    controllers: [MessageController],
    exports: [MessageService]
})
export class MessageModule {}
