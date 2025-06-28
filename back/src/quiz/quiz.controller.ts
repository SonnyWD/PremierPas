import { Controller, Get, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get()
  findAll() {
    return this.quizService.findAllQuiz();
  }

  @Get('id')
  findOne(@Param('id') id: number) {
    return this.quizService.findOneQuiz(+id);
  }
}
