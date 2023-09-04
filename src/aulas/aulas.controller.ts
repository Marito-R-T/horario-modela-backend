import { Body, Controller, Delete, Get, Query, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Aula } from './aula.entity';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { Pagination } from 'src/dto/pagination.dto';

@ApiBearerAuth()
@Controller('aulas')
export class AulasController {
  constructor(private readonly aulaService: AulasService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de aulas correctamente.'})
  getAulas(@Query() query: Pagination): Promise<[Aula[], number]> {
    return this.aulaService.getAulas(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de aulas correctamente.'})
  getAllAulas(): Promise<Aula[]> {
    return this.aulaService.getAllAulas();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ha sido retornado el aula correctamente.'})
  getAula(@Param('id', ParseIntPipe) id: number): Promise<Aula> {
    return this.aulaService.getAula(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ status: 200, description: 'Ha sido agregado el aula correctamente.'})
  createAula(@Body() newBook: CreateAulaDto): Promise<Aula> {
    return this.aulaService.createAula(newBook);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Han sido eliminado el aula correctamente.'})
  deleteAula(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.aulaService.deleteAula(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ha sido modificado el aula correctamente.'})
  updateAula(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateAulaDto): Promise<UpdateResult> {
    return this.aulaService.updateAula(id, book);
  }
}
