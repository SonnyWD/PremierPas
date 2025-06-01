import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class TodoList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    categorie: string;

    @Column({ type: 'varchar'})
    title: string;

    @Column({ type: 'boolean', default: false }) 
    completed: boolean;

    @ManyToOne(() => User, (user) => user.todos)
    user: User;

}
