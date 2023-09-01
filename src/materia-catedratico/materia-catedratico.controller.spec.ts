import { Test, TestingModule } from '@nestjs/testing';
import { MateriaCatedraticoController } from './materia-catedratico.controller';

describe('MateriaCatedraticoController', () => {
  let controller: MateriaCatedraticoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriaCatedraticoController],
    }).compile();

    controller = module.get<MateriaCatedraticoController>(MateriaCatedraticoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
