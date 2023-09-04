import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catedratico } from './catedratico.entity';
import { CreateCatedraticoDto } from './dto/create-catedratico.dto';
import { UpdateCatedraticoDto } from './dto/update-catedratico.dto';
import { Pagination } from 'src/dto/pagination.dto';

@Injectable()
export class CatedraticosService {
  constructor(@InjectRepository(Catedratico) private catedraticoRepository: Repository<Catedratico>) {}
  
  createCatedratico(catedratico: CreateCatedraticoDto) {
    const newCatedratico = this.catedraticoRepository.create(catedratico);
    return this.catedraticoRepository.save(newCatedratico)
  }

  getAllCatedraticos() {
    return this.catedraticoRepository.find();
  }

  getCatedraticos(pagination: Pagination) {
    return this.catedraticoRepository.findAndCount({
      take: pagination.number,
      skip: (pagination.page - 1) * pagination.number
    })
  }

  getCatedratico(id: number) {
    return this.catedraticoRepository.findOne({
      where: {
        id: id
      }
    })
  }

  deleteCatedratico(id: number) {
    return this.catedraticoRepository.delete({ id });
  }

  updateCatedratico(id: number, catedratico: UpdateCatedraticoDto) {
    return this.catedraticoRepository.update({ id }, catedratico);
  }
}
