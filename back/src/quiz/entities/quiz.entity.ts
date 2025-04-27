import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Quiz {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar'})
    title: string;

    @Column({ type: 'varchar'})
    theme: string;

    @ManyToOne(() => User, (user) => user.quizs)
    user: User;

    @OneToMany(() => Question, (questions) => questions.quiz, { cascade: true})
    questions: Question[];
    
}
