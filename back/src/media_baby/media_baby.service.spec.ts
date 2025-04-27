import { Test, TestingModule } from '@nestjs/testing';
import { MediaBabyService } from './media_baby.service';

describe('MediaBabyService', () => {
  let service: MediaBabyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaBabyService],
    }).compile();

    service = module.get<MediaBabyService>(MediaBabyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
