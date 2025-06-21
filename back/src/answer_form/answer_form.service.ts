import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAnswerFormDto } from './dto/create-answer_form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnswerForm } from './entities/answer_form.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AnswerFormService {
  constructor(
    @InjectRepository(AnswerForm)
    private answerFormRepository: Repository<AnswerForm>,
    private readonly usersService: UsersService
  ) {}

  async submitAnswer(userId: number, formId: number, answers: CreateAnswerFormDto) {
    const user = await this.usersService.findUser(userId);

    const newAnswer = this.answerFormRepository.create({
      user: user,
      content: answers.content,
      reason: answers.reason || '',
    });

    await this.answerFormRepository.save(newAnswer);

    return { message: "Réponse au formulaire soumise avec succès." };
  }


  async findAll(userId: number): Promise<AnswerForm[]> {
    return await this.answerFormRepository.find({
      where: { user: {id: userId}},
      relations: ['user']
    })
  }

  async findOne(id: number): Promise<AnswerForm> {
    const answersForm = await this.answerFormRepository.findOne({
      where: { id }
    });

    if(!answersForm){
      throw new NotFoundException('Aucune réponse de formulaire trouvée.');
    }

    return answersForm;
  }

}


