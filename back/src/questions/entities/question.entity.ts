import { Quiz } from "src/quiz/entities/quiz.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text'})
    questionText: string;

    @Column({ type: 'json'})
    suggestions: string[];

    @ManyToOne(() => Quiz, (quiz) => quiz.questions)
    quiz: Quiz;
}
