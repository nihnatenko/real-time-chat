import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from '../message/messageService';
import axios from 'axios';

@WebSocketGateway({
    namespace: '/chat',
    cors: {
        origin: 'http://localhost:63342',
        methods: ['GET', 'POST'],
        credentials: false,
    },
})
export class ChatGateway {
    constructor(private readonly messageService: MessageService) {}

    @WebSocketServer()
    public server!: Server;

    @SubscribeMessage('message')
    async handleMessage(@MessageBody() payload: any) {
        console.log('Send to Lambda:', payload);
        const lambdaResp = await axios.post('https://ziocjt6haa.execute-api.eu-central-1.amazonaws.com/Prod/process', payload);
        console.log('Response from Lambda:', lambdaResp.data);
        const sanitized = lambdaResp.data;
        const saved = await this.messageService.save(sanitized);
        this.server.emit('message', saved);
    }
}
