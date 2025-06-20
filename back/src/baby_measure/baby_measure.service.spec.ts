import { Test, TestingModule } from '@nestjs/testing';
import { BabyMeasureService } from './baby_measure.service';

describe('BabyMeasureService', () => {
  let service: BabyMeasureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BabyMeasureService],
    }).compile();

    service = module.get<BabyMeasureService>(BabyMeasureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
