import { Body, Controller, Delete, Get, Query, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CatedraticosService } from './catedraticos.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Catedratico } from './catedratico.entity';
import { CreateCatedraticoDto } from './dto/create-catedratico.dto';
import { UpdateCatedraticoDto } from './dto/update-catedratico.dto';
import { Pagination } from 'src/dto/pagination.dto';

@ApiBearerAuth()
@Controller('catedraticos')
export class CatedraticosController {
  constructor(private readonly catedraticoService: CatedraticosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de catedraticos correctamente.'})
  getCatedraticos(@Query() query: Pagination): Promise<[Catedratico[], number]> {
    return this.catedraticoService.getCatedraticos(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/all")
  @ApiResponse({ status: 200, description: 'Han sido retornado el array de catedraticos correctamente.'})
  getAllCatedraticos(): Promise<Catedratico[]> {
    return this.catedraticoService.getAllCatedraticos();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ha sido retornado el catedratico correctamente.'})
  getCatedratico(@Param('id', ParseIntPipe) id: number): Promise<Catedratico> {
    return this.catedraticoService.getCatedratico(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiResponse({ status: 200, description: 'Ha sido agregado el catedratico correctamente.'})
  createCatedratico(@Body() newBook: CreateCatedraticoDto): Promise<Catedratico> {
    return this.catedraticoService.createCatedratico(newBook);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Han sido eliminado el catedratico correctamente.'})
  deleteCatedratico(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.catedraticoService.deleteCatedratico(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ha sido modificado el catedratico correctamente.'})
  updateCatedratico(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateCatedraticoDto): Promise<UpdateResult> {
    return this.catedraticoService.updateCatedratico(id, book);
  }
}
