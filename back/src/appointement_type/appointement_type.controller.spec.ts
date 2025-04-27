import { Test, TestingModule } from '@nestjs/testing';
import { AppointementTypeController } from './appointement_type.controller';
import { AppointementTypeService } from './appointement_type.service';

describe('AppointementTypeController', () => {
  let controller: AppointementTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointementTypeController],
      providers: [AppointementTypeService],
    }).compile();

    controller = module.get<AppointementTypeController>(AppointementTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
