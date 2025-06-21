import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class AnswerForm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    content: string;

    @Column({ type: 'varchar'})
    reason: string;

    @ManyToOne(() => User, (user) => user.answersForm)
    user: User;
}
