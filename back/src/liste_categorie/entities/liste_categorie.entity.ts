import { TodoList } from 'src/todo_list/entities/todo_list.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class ListeCategorie {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    title: string;

    @Column({ type: 'varchar'})
    suggestion: string;

    @ManyToOne(() => User, (user) => user.categories, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => TodoList, (todo) => todo.categorie, { cascade: true })
    todos: TodoList[];
}
