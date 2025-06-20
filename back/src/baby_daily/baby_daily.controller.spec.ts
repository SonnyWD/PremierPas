import { Test, TestingModule } from '@nestjs/testing';
import { BabyDailyController } from './baby_daily.controller';
import { BabyDailyService } from './baby_daily.service';

describe('BabyDailyController', () => {
  let controller: BabyDailyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BabyDailyController],
      providers: [BabyDailyService],
    }).compile();

    controller = module.get<BabyDailyController>(BabyDailyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
