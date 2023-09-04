import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MateriaCatedratico } from './materia-catedratico.entity';
import { CreateMateriaCatedraticoDto } from './dto/create-materia-catedratico.dto';
import { UpdateMateriaCatedraticoDto } from './dto/update-materia-catedratico.dto';
import { Pagination } from 'src/dto/pagination.dto';

@Injectable()
export class MateriaCatedraticoService {
  constructor(@InjectRepository(MateriaCatedratico) private mcRepository: Repository<MateriaCatedratico>) {}
    
  createMateriaCatedratico(mc: CreateMateriaCatedraticoDto) {
    const newMC = this.mcRepository.create(mc);
    return this.mcRepository.save(newMC)
  }

  getAllMateriasCatedraticos() {
    return this.mcRepository.find()
  }

  getMateriasCatedraticos(pagination: Pagination) {
    return this.mcRepository.findAndCount({
      take: pagination.number,
      skip: (pagination.page - 1) * pagination.number,
      relations: {
        catedratico: true,
        materia: true
      }
    })
  }

  getMateriaCatedratico(materia_id: number, catedratico_id: number) {
    return this.mcRepository.findOne({
      where: {
        materia_id,
        catedratico_id
      }
    })
  }

  deleteMateriaCatedratico(materia_id: number, catedratico_id: number) {
    return this.mcRepository.delete({ materia_id, catedratico_id });
  }

  updateMateriaCatedratico(materia_id: number, catedratico_id: number, mc: UpdateMateriaCatedraticoDto) {
    return this.mcRepository.update({ materia_id, catedratico_id }, mc);
  }
}
