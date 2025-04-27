import { Test, TestingModule } from '@nestjs/testing';
import { BabyController } from './baby.controller';
import { BabyService } from './baby.service';

describe('BabyController', () => {
  let controller: BabyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BabyController],
      providers: [BabyService],
    }).compile();

    controller = module.get<BabyController>(BabyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
