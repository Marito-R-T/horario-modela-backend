import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aula } from './aula.entity';
import { Repository } from 'typeorm';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';

@Injectable()
export class AulasService {
  constructor(@InjectRepository(Aula) private aulaRepository: Repository<Aula>) {}

  createBook(book: CreateAulaDto) {
    const newBook = this.aulaRepository.create(book);
    return this.aulaRepository.save(newBook)
  }

  getBooks() {
    return this.aulaRepository.find()
  }

  getBook(id: number) {
    return this.aulaRepository.findOne({
      where: {
        id: id
      }
    })
  }

  deleteBook(id: number) {
    return this.aulaRepository.delete({ id });
  }

  updateBook(id: number, book: UpdateAulaDto) {
    return this.aulaRepository.update({ id }, book);
  }
}
