import { Test, TestingModule } from '@nestjs/testing';
import { LikePublicationController } from './like_publication.controller';
import { LikePublicationService } from './like_publication.service';

describe('LikePublicationController', () => {
  let controller: LikePublicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikePublicationController],
      providers: [LikePublicationService],
    }).compile();

    controller = module.get<LikePublicationController>(
      LikePublicationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
