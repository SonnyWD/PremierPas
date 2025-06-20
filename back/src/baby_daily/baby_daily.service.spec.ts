import { Test, TestingModule } from '@nestjs/testing';
import { BabyDailyService } from './baby_daily.service';

describe('BabyDailyService', () => {
  let service: BabyDailyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BabyDailyService],
    }).compile();

    service = module.get<BabyDailyService>(BabyDailyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
