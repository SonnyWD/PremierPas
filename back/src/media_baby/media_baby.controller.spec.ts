import { Test, TestingModule } from '@nestjs/testing';
import { MediaBabyController } from './media_baby.controller';
import { MediaBabyService } from './media_baby.service';

describe('MediaBabyController', () => {
  let controller: MediaBabyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MediaBabyController],
      providers: [MediaBabyService],
    }).compile();

    controller = module.get<MediaBabyController>(MediaBabyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
