import { Test, TestingModule } from '@nestjs/testing';
import { LikePublicationService } from './like_publication.service';

describe('LikePublicationService', () => {
  let service: LikePublicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikePublicationService],
    }).compile();

    service = module.get<LikePublicationService>(LikePublicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
