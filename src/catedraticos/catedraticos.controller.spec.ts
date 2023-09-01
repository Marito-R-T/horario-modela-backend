import { Test, TestingModule } from '@nestjs/testing';
import { CatedraticosController } from './catedraticos.controller';

describe('CatedraticosController', () => {
  let controller: CatedraticosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatedraticosController],
    }).compile();

    controller = module.get<CatedraticosController>(CatedraticosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
