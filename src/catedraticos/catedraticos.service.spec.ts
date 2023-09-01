import { Test, TestingModule } from '@nestjs/testing';
import { CatedraticosService } from './catedraticos.service';

describe('CatedraticosService', () => {
  let service: CatedraticosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatedraticosService],
    }).compile();

    service = module.get<CatedraticosService>(CatedraticosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
