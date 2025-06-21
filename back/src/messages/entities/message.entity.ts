import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn({ type: 'timestamp' })
    sendingDate: Date;

    @Column({ default: false })
    isDeletedBySender: boolean;

    @Column({ default: false })
    isDeletedByReceiver: boolean;

    @ManyToOne(() => User, (user) => user.sentMessages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_envoyeur' })
    envoyeur: User;

    @ManyToOne(() => User, (user) => user.receivedMessages, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_receveur' })
    receveur: User;
}

