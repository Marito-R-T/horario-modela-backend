import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from './materia.entity';

@Injectable()
export class MateriasService {
  constructor(@InjectRepository(Materia) private materiaRepository: Repository<Materia>) {}
}
