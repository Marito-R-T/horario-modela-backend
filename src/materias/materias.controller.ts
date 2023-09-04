import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, Query } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MateriasService } from './materias.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Materia } from './materia.entity';
import { CreateMateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { Pagination } from 'src/dto/pagination.dto';

@ApiBearerAuth()
@Controller('materias')
export class MateriasController {
  constructor(private readonly materiaService: MateriasService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de materias correctamente.'})
  getMaterias(@Query() query: Pagination): Promise<[Materia[], number]> {
    return this.materiaService.getMaterias(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de materias correctamente.'})
  getAllMaterias(): Promise<Materia[]> {
    return this.materiaService.getAllMaterias();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ha sido retornada la materia correctamente.'})
  getMateria(@Param('id', ParseIntPipe) id: number): Promise<Materia> {
    return this.materiaService.getMateria(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ status: 200, description: 'Ha sido agregada la materia correctamente.'})
  createMateria(@Body() newBook: CreateMateriaDto): Promise<Materia> {
    return this.materiaService.createMateria(newBook);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Han sido eliminada la materia correctamente.'})
  deleteMateria(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.materiaService.deleteMateria(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ha sido modificada la materia correctamente.'})
  updateMateria(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateMateriaDto): Promise<UpdateResult> {
    return this.materiaService.updateMateria(id, book);
  }
}
