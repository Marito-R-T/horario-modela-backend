import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aula } from 'src/aulas/aula.entity';
import { Catedratico } from 'src/catedraticos/catedratico.entity';
import { MateriaCatedratico } from 'src/materia-catedratico/materia-catedratico.entity';
import { Materia } from 'src/materias/materia.entity';
import { Repository } from 'typeorm';
import { Horario } from './Horario';
import { SettingsDto } from './dto/settings.dto';
import { MateriasService } from 'src/materias/materias.service';
import { AulasService } from 'src/aulas/aulas.service';
import { SeccionesService } from 'src/secciones/secciones.service';
import { Seccion } from 'src/secciones/seccion.entity';
import { PorcentajeSeccionPeriodo } from './dto/porcentaje-seccion-periodo';

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Catedratico) private catedraticoRepository: Repository<Catedratico>,
    @InjectRepository(MateriaCatedratico) private mcRepository: Repository<MateriaCatedratico>,
    @InjectRepository(Materia) private materiaRepository: Repository<Materia>,
    @InjectRepository(Aula) private aulaRepository: Repository<Aula>,
    @InjectRepository(Seccion) private seccionRepository: Repository<Seccion>,
    private readonly materiaService: MateriasService,
    private readonly aulaService: AulasService,
    private readonly seccionService: SeccionesService
  ) {}
  
  async createHorario(settings: SettingsDto): Promise<Array<Array<PorcentajeSeccionPeriodo>>> {
    let secciones = await this.seccionService.getAllSecciones()
    let aulas = await this.aulaService.getAllAulas()
    
    return this.createPorcentajeMaterias(secciones, aulas)
  }

  createPorcentajeMaterias(secciones: Seccion[], aulas: Aula[]): Array<Array<PorcentajeSeccionPeriodo>> {
    let aulasSeccionesPorcentage: Array<Array<PorcentajeSeccionPeriodo>> = []
    for (let i = 0; i < aulas.length; i++) {
      const aula = aulas[i];
      let aulap: Array<PorcentajeSeccionPeriodo> = [];
      for (let j = 0; j < secciones.length; j++) {
        const seccion = secciones[j];
        const psp: PorcentajeSeccionPeriodo = {
          aula: aula,
          seccion: seccion,
          diferencia_capacidad_asignaciones: aula.capacidad - seccion.asignados
        };
        aulap.push(psp);
      }
      aulap.sort((a: PorcentajeSeccionPeriodo, b:PorcentajeSeccionPeriodo): number => {
        if (a.diferencia_capacidad_asignaciones < 0 && b.diferencia_capacidad_asignaciones >= 0) return 1
        else if (a.diferencia_capacidad_asignaciones >= 0 && b.diferencia_capacidad_asignaciones < 0) return -1
        return a.diferencia_capacidad_asignaciones - b.diferencia_capacidad_asignaciones
      })
      for (let j = 0; j < aulap.length; j++) {
        const psp = aulap[j];
        psp.porcentaje = 1 - ((1/100)*j)
        if(psp.porcentaje < 0.1) psp.porcentaje = 0.1
      }
      aulasSeccionesPorcentage.push(aulap);
    }
    return aulasSeccionesPorcentage;
  }

}
