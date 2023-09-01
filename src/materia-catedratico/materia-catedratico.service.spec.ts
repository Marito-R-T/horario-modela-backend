import { Test, TestingModule } from '@nestjs/testing';
import { MateriaCatedraticoService } from './materia-catedratico.service';

describe('MateriaCatedraticoService', () => {
  let service: MateriaCatedraticoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriaCatedraticoService],
    }).compile();

    service = module.get<MateriaCatedraticoService>(MateriaCatedraticoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
