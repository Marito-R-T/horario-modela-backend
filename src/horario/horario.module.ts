import { Module } from '@nestjs/common';
import { HorarioController } from './horario.controller';
import { HorarioService } from './horario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catedratico } from 'src/catedraticos/catedratico.entity';
import { Aula } from 'src/aulas/aula.entity';
import { Materia } from 'src/materias/materia.entity';
import { MateriaCatedratico } from 'src/materia-catedratico/materia-catedratico.entity';
import { MateriasService } from 'src/materias/materias.service';
import { CatedraticosService } from 'src/catedraticos/catedraticos.service';
import { SeccionesService } from 'src/secciones/secciones.service';
import { AulasService } from 'src/aulas/aulas.service';
import { Seccion } from 'src/secciones/seccion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Catedratico]), 
    TypeOrmModule.forFeature([Aula]),
    TypeOrmModule.forFeature([Materia]),
    TypeOrmModule.forFeature([MateriaCatedratico]),
    TypeOrmModule.forFeature([Seccion]),
  ],
  controllers: [HorarioController],
  providers: [
    HorarioService, 
    MateriasService, 
    AulasService, 
    SeccionesService
  ]
})
export class HorarioModule {}
