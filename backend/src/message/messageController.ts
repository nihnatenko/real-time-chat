import { Controller, Get, Query } from '@nestjs/common';
import { MessageService } from './messageService';

@Controller('messages')
export class MessageController {
    constructor(private service: MessageService) {}

    @Get()
    getMessages(@Query('limit') limit = 10, @Query('offset') offset = 0) {
        return this.service.findAll(Number(limit), Number(offset));
    }
}
