import { Test, TestingModule } from '@nestjs/testing';
import { BabyMeasureController } from './baby_measure.controller';
import { BabyMeasureService } from './baby_measure.service';

describe('BabyMeasureController', () => {
  let controller: BabyMeasureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BabyMeasureController],
      providers: [BabyMeasureService],
    }).compile();

    controller = module.get<BabyMeasureController>(BabyMeasureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
