import { Test, TestingModule } from '@nestjs/testing';
import { MedicalAppointementController } from './medical_appointement.controller';
import { MedicalAppointementService } from './medical_appointement.service';

describe('MedicalAppointementController', () => {
  let controller: MedicalAppointementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalAppointementController],
      providers: [MedicalAppointementService],
    }).compile();

    controller = module.get<MedicalAppointementController>(MedicalAppointementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
