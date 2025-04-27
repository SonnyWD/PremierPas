import { Test, TestingModule } from '@nestjs/testing';
import { ListeCategorieController } from './liste_categorie.controller';
import { ListeCategorieService } from './liste_categorie.service';

describe('ListeCategorieController', () => {
  let controller: ListeCategorieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListeCategorieController],
      providers: [ListeCategorieService],
    }).compile();

    controller = module.get<ListeCategorieController>(ListeCategorieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
