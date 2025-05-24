import { Test, TestingModule } from '@nestjs/testing';
import { AccessContentController } from './access_content.controller';
import { AccessContentService } from './access_content.service';

describe('AccessContentController', () => {
  let controller: AccessContentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccessContentController],
      providers: [AccessContentService],
    }).compile();

    controller = module.get<AccessContentController>(AccessContentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
