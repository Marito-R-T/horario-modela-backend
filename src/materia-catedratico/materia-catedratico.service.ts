import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MateriaCatedratico } from './materia-catedratico.entity';

@Injectable()
export class MateriaCatedraticoService {
  constructor(@InjectRepository(MateriaCatedratico) private mcRepository: Repository<MateriaCatedratico>) {}
}
