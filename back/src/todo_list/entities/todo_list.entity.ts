import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';

@Entity('user_todo') 
@Index(["user", "suggestedTodoKey"], { unique: true, where: "suggestedTodoKey IS NOT NULL" })
export class TodoList { 
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'boolean', default: false })
    completed: boolean;

    @Column({ type: 'boolean', default: true })
    isCustom: boolean; 

    @Column({ type: 'int', nullable: true }) 
    suggestedTodoKey: number | null; 

    @ManyToOne(() => User, (user) => user.todos) 
    user: User;
}