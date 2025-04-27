import { Test, TestingModule } from '@nestjs/testing';
import { AnswerFormController } from './answer_form.controller';
import { AnswerFormService } from './answer_form.service';

describe('AnswerFormController', () => {
  let controller: AnswerFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerFormController],
      providers: [AnswerFormService],
    }).compile();

    controller = module.get<AnswerFormController>(AnswerFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
