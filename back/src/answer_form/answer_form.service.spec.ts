import { Test, TestingModule } from '@nestjs/testing';
import { AnswerFormService } from './answer_form.service';

describe('AnswerFormService', () => {
  let service: AnswerFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerFormService],
    }).compile();

    service = module.get<AnswerFormService>(AnswerFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
