import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seccion } from './seccion.entity';

@Injectable()
export class SeccionesService {
  constructor(@InjectRepository(Seccion) private seccionRepository: Repository<Seccion>) {}
}
