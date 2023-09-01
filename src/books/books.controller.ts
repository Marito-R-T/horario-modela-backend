import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Book } from './book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de libros correctamente.'})
  getBooks(): Promise<Book[]> {
    return this.bookService.getBooks();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ha sido retornado el libro correctamente.'})
  getBook(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this.bookService.getBook(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ status: 200, description: 'Ha sido agregado el libro correctamente.'})
  createBook(@Body() newBook: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(newBook);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Han sido eliminado el libro correctamente.'})
  deleteBook(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.bookService.deleteBook(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ha sido modificado el libro correctamente.'})
  updateBook(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateBookDto): Promise<UpdateResult> {
    return this.bookService.updateBook(id, book);
  }
}
