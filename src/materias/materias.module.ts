import { Module } from '@nestjs/common';
import { MateriasService } from './materias.service';
import { MateriasController } from './materias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Materia } from './materia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materia])],
  providers: [MateriasService],
  controllers: [MateriasController],
  exports: [MateriasService]
})
export class MateriasModule {}
