import { ListeCategorie } from 'src/liste_categorie/entities/liste_categorie.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class TodoList {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    title: string;

    @Column({ type: 'varchar'})
    description: string;

    @Column({ type: 'boolean', default: false }) 
    completed: boolean;

    @ManyToOne(() => User, (user) => user.todos)
    user: User;

    @ManyToOne(() => ListeCategorie, (categorie) => categorie.todos, { onDelete: 'CASCADE' })
    categorie: ListeCategorie;
}
