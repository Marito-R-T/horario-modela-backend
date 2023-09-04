import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Materia } from './materia.entity';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Pagination } from 'src/dto/pagination.dto';

@Injectable()
export class MateriasService {
  constructor(@InjectRepository(Materia) private materiaRepository: Repository<Materia>) {}
  
  createMateria(materia: CreateMateriaDto) {
    const newMateria = this.materiaRepository.create(materia);
    return this.materiaRepository.save(newMateria)
  }

  getAllMaterias() {
    return this.materiaRepository.find();
  }

  getMaterias(pagination: Pagination) {
    return this.materiaRepository.findAndCount({
      take: pagination.number,
      skip: (pagination.page - 1) * pagination.number
    })
  }

  getMateria(id: number) {
    return this.materiaRepository.findOne({
      where: {
        id: id
      }
    })
  }

  deleteMateria(id: number) {
    return this.materiaRepository.delete({ id });
  }

  updateMateria(id: number, materia: UpdateMateriaDto) {
    return this.materiaRepository.update({ id }, materia);
  }
}
