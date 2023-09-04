import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aula } from './aula.entity';
import { Repository } from 'typeorm';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { Pagination } from 'src/dto/pagination.dto';

@Injectable()
export class AulasService {
  constructor(@InjectRepository(Aula) private aulaRepository: Repository<Aula>) {}

  createAula(aula: CreateAulaDto) {
    const newAula = this.aulaRepository.create(aula);
    return this.aulaRepository.save(newAula)
  }

  getAllAulas() {
    return this.aulaRepository.find()
  }

  getAulas(pagination: Pagination) {
    return this.aulaRepository.findAndCount({
      take: pagination.number,
      skip: (pagination.page - 1) * pagination.number
    })
  }

  getAula(id: number) {
    return this.aulaRepository.findOne({
      where: {
        id: id
      }
    })
  }

  deleteAula(id: number) {
    return this.aulaRepository.delete({ id });
  }

  updateAula(id: number, aula: UpdateAulaDto) {
    return this.aulaRepository.update({ id }, aula);
  }
}
