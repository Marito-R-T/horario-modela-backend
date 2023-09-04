import { Body, Controller, Delete, Get, Query, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MateriaCatedraticoService } from './materia-catedratico.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MateriaCatedratico } from './materia-catedratico.entity';
import { CreateMateriaCatedraticoDto } from './dto/create-materia-catedratico.dto';
import { UpdateMateriaCatedraticoDto } from './dto/update-materia-catedratico.dto';
import { Pagination } from 'src/dto/pagination.dto';

@ApiBearerAuth()
@Controller('materia-catedratico')
export class MateriaCatedraticoController {
  constructor(private readonly mcService: MateriaCatedraticoService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de materias catedraticos correctamente.'})
  getMateriasCatedraticos(@Query() query: Pagination): Promise<[MateriaCatedratico[], number]> {
    return this.mcService.getMateriasCatedraticos(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de materias catedraticos correctamente.'})
  getAllMateriasCatedraticos(): Promise<MateriaCatedratico[]> {
    return this.mcService.getAllMateriasCatedraticos();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:materia_id/:catedratico_id')
  @ApiResponse({ status: 200, description: 'Ha sido retornada la materia catedratico correctamente.'})
  getMateriaCatedratico(@Param('materia_id', ParseIntPipe) materia_id: number, 
            @Param('catedratico_id', ParseIntPipe) catedratico_id: number): Promise<MateriaCatedratico> {
    return this.mcService.getMateriaCatedratico(materia_id, catedratico_id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ status: 200, description: 'Ha sido agregada la materia catedratico correctamente.'})
  createMateriaCatedratico(@Body() newBook: CreateMateriaCatedraticoDto): Promise<MateriaCatedratico> {
    return this.mcService.createMateriaCatedratico(newBook);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Han sido eliminada la materia catedratico correctamente.'})
  deleteMateriaCatedratico(@Param('materia_id', ParseIntPipe) materia_id: number, 
                @Param('catedratico_id', ParseIntPipe) catedratico_id: number): Promise<DeleteResult> {
    return this.mcService.deleteMateriaCatedratico(materia_id, catedratico_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ha sido modificada la materia catedratico correctamente.'})
  updateMateriaCatedratico(@Param('materia_id', ParseIntPipe) materia_id: number, 
                @Param('catedratico_id', ParseIntPipe) catedratico_id: number, 
                @Body() book: UpdateMateriaCatedraticoDto): Promise<UpdateResult> {
    return this.mcService.updateMateriaCatedratico(materia_id, catedratico_id, book);
  }
}
