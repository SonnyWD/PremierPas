import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './entities/quiz.entity';
import { Repository } from 'typeorm';
import { Question } from 'src/questions/entities/question.entity';


@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ){}

  async findAllQuiz(): Promise<Quiz[]> {
    return await this.quizRepository.find();
  }


  async findOneQuiz(id: number): Promise<Quiz> {
    const quiz = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions']
    });

    if (!quiz) {
      throw new NotFoundException('Quiz non trouvé');
    }

    return quiz;
  }
}
