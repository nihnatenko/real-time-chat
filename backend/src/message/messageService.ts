import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './messageEntity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private repo: Repository<Message>,
    ) {}

    save(data: Partial<Message>) {
        return this.repo.save(data);
    }

    findAll(limit: number, offset: number) {
        return this.repo.find({ skip: offset, take: limit, order: { timestamp: 'DESC' } });
    }
}
