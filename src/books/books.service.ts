import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

  createBook(book: CreateBookDto) {
    const newBook = this.bookRepository.create(book);
    return this.bookRepository.save(newBook)
  }

  getBooks() {
    return this.bookRepository.find()
  }

  getBook(id: number) {
    return this.bookRepository.findOne({
      where: {
        id: id
      }
    })
  }

  deleteBook(id: number) {
    return this.bookRepository.delete({ id });
  }

  updateBook(id: number, book: UpdateBookDto) {
    return this.bookRepository.update({ id }, book);
  }
}
