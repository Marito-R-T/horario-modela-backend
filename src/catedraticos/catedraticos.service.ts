import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catedratico } from './catedratico.entity';

@Injectable()
export class CatedraticosService {
  constructor(@InjectRepository(Catedratico) private catedraticoRepository: Repository<Catedratico>) {}
}
