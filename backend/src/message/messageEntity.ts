import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number = 0;

    @Column('varchar', { length: 36 })
    userId: string = '';

    @Column('text')
    content: string = '';

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    timestamp: Date = new Date();
}
