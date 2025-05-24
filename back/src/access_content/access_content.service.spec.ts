import { Test, TestingModule } from '@nestjs/testing';
import { AccessContentService } from './access_content.service';

describe('AccessContentService', () => {
  let service: AccessContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccessContentService],
    }).compile();

    service = module.get<AccessContentService>(AccessContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
