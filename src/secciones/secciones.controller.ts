import { Body, Controller, Delete, Get, Param, Query, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SeccionesService } from './secciones.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Seccion } from './seccion.entity';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { Pagination } from 'src/dto/pagination.dto';

@ApiBearerAuth()
@Controller('secciones')
export class SeccionesController {
  constructor(private readonly seccionService: SeccionesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de secciones correctamente.'})
  getSecciones(@Query() query: Pagination): Promise<[Seccion[], number]> {
    return this.seccionService.getSecciones(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de secciones correctamente.'})
  getAllSecciones(): Promise<Seccion[]> {
    return this.seccionService.getAllSecciones();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ha sido retornada la seccion correctamente.'})
  getSeccion(@Param('id', ParseIntPipe) id: number): Promise<Seccion> {
    return this.seccionService.getSeccion(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ status: 200, description: 'Ha sido agregada la seccion correctamente.'})
  createSeccion(@Body() newBook: CreateSeccionDto): Promise<Seccion> {
    return this.seccionService.createSeccion(newBook);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Han sido eliminada la seccion correctamente.'})
  deleteSeccion(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.seccionService.deleteSeccion(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ha sido modificada la seccion correctamente.'})
  updateSeccion(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateSeccionDto): Promise<UpdateResult> {
    return this.seccionService.updateSeccion(id, book);
  }
}
