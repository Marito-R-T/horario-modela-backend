import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Aula } from './aula.entity';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';

@ApiBearerAuth()
@Controller('aulas')
export class AulasController {
  constructor(private readonly aulaService: AulasService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de libros correctamente.'})
  getBooks(): Promise<Aula[]> {
    return this.aulaService.getBooks();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ha sido retornado el libro correctamente.'})
  getBook(@Param('id', ParseIntPipe) id: number): Promise<Aula> {
    return this.aulaService.getBook(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ status: 200, description: 'Ha sido agregado el libro correctamente.'})
  createBook(@Body() newBook: CreateAulaDto): Promise<Aula> {
    return this.aulaService.createBook(newBook);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Han sido eliminado el libro correctamente.'})
  deleteBook(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.aulaService.deleteBook(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ha sido modificado el libro correctamente.'})
  updateBook(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateAulaDto): Promise<UpdateResult> {
    return this.aulaService.updateBook(id, book);
  }
}
