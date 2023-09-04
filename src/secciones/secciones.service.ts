import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seccion } from './seccion.entity';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { Pagination } from 'src/dto/pagination.dto';

@Injectable()
export class SeccionesService {
  constructor(@InjectRepository(Seccion) private seccionRepository: Repository<Seccion>) {}
  
  createSeccion(seccion: CreateSeccionDto) {
    const newSeccion = this.seccionRepository.create(seccion);
    return this.seccionRepository.save(newSeccion)
  }

  getSecciones(pagination: Pagination) {
    return this.seccionRepository.findAndCount({
      take: pagination.number,
      skip: (pagination.page - 1) * pagination.number,
      relations: {
        materia: true
      }
    })
  }

  getAllSecciones() {
    return this.seccionRepository.find()
  }

  getSeccion(id: number) {
    return this.seccionRepository.findOne({
      where: {
        id: id
      }
    })
  }

  deleteSeccion(id: number) {
    return this.seccionRepository.delete({ id });
  }

  updateSeccion(id: number, seccion: UpdateSeccionDto) {
    return this.seccionRepository.update({ id }, seccion);
  }
}
