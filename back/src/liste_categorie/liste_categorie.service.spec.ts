import { Test, TestingModule } from '@nestjs/testing';
import { ListeCategorieService } from './liste_categorie.service';

describe('ListeCategorieService', () => {
  let service: ListeCategorieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListeCategorieService],
    }).compile();

    service = module.get<ListeCategorieService>(ListeCategorieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
