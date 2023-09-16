import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Aula } from 'src/aulas/aula.entity';
import { Catedratico } from 'src/catedraticos/catedratico.entity';
import { MateriaCatedratico } from 'src/materia-catedratico/materia-catedratico.entity';
import { Materia } from 'src/materias/materia.entity';
import { Repository } from 'typeorm';
import { Horario, HorarioFinal } from './Horario';
import { SettingsDto } from './dto/settings.dto';
import { MateriasService } from 'src/materias/materias.service';
import { AulasService } from 'src/aulas/aulas.service';
import { SeccionesService } from 'src/secciones/secciones.service';
import { Seccion } from 'src/secciones/seccion.entity';
import { PorcentajeSeccionPeriodo } from './dto/porcentaje-seccion-periodo';
import { PeriodoProbabilidad } from './PeriodoProbabilidad';
import { Hora } from './Hora';
import { AulaProbabilidad } from './AulaProbabilidad';
import { AulaSeccionProbabilidad, SeccionAulasProbabilidad } from './AulaSeccionProbabilidad';
import { CatedraticosService } from 'src/catedraticos/catedraticos.service';
import { Periodo } from './Periodo';
import { Errores } from './Errores';

@Injectable()
export class HorarioService {
  constructor(
    @InjectRepository(Catedratico) private catedraticoRepository: Repository<Catedratico>,
    @InjectRepository(MateriaCatedratico) private mcRepository: Repository<MateriaCatedratico>,
    @InjectRepository(Materia) private materiaRepository: Repository<Materia>,
    @InjectRepository(Aula) private aulaRepository: Repository<Aula>,
    @InjectRepository(Seccion) private seccionRepository: Repository<Seccion>,
    private readonly materiaService: MateriasService,
    private readonly catedraticoService: CatedraticosService,
    private readonly aulaService: AulasService,
    private readonly seccionService: SeccionesService
  ) {}
  
  async createHorario(settings: SettingsDto): Promise<Array<HorarioFinal>> {
    let secciones = await this.seccionService.getAllSecciones()
    let aulas = await this.aulaService.getAllAulas()
    let catedraticos = await this.catedraticoService.getAllCatedraticos()
    
    let probabilidadSeccionAulas = this.createPorcentajeSecciones(secciones, aulas, settings)
    let probabilidadMateriasAulas = this.createPorcentajeMaterias(probabilidadSeccionAulas, aulas, settings)
    let horario = this.createPorcentajesCombinados(probabilidadMateriasAulas, catedraticos, settings)
    let horarioSegunMejorCaso = this.crearHorarioSegunMejorCaso(horario, settings.cantidad_horarios)
    let horariosFinales = this.crearHorarioFinales(aulas, horarioSegunMejorCaso, secciones, settings)
    return horariosFinales
  }

  createPorcentajeSecciones(secciones: Seccion[], aulas: Aula[], settings: SettingsDto): Array<SeccionAulasProbabilidad> {
    let aulasSeccionesPorcentage: Array<SeccionAulasProbabilidad> = []
    for (let i = 0; i < secciones.length; i++) {
      const seccion = secciones[i];
      let seccionp: SeccionAulasProbabilidad = {
        seccion: seccion,
        porcentajeAulas: []
      };
      for (let j = 0; j < aulas.length; j++) {
        const aula = aulas[j];
        const psp: PorcentajeSeccionPeriodo = {
          aula: aula,
          seccion: seccion,
          diferencia_capacidad_asignaciones: aula.capacidad - seccion.asignados,
          errores: [],
          avisos: []
        };
        seccionp.porcentajeAulas.push(psp);
      }
      seccionp.porcentajeAulas.sort((a: PorcentajeSeccionPeriodo, b:PorcentajeSeccionPeriodo): number => {
        if (a.diferencia_capacidad_asignaciones < 0 && b.diferencia_capacidad_asignaciones >= 0) return 1
        else if (a.diferencia_capacidad_asignaciones >= 0 && b.diferencia_capacidad_asignaciones < 0) return -1
        else if (a.diferencia_capacidad_asignaciones < 0 && b.diferencia_capacidad_asignaciones < 0) return (a.diferencia_capacidad_asignaciones*-1) - (b.diferencia_capacidad_asignaciones*-1)
        return a.diferencia_capacidad_asignaciones - b.diferencia_capacidad_asignaciones
      })
      for (let j = 0; j < seccionp.porcentajeAulas.length; j++) {
        const psp = seccionp.porcentajeAulas[j];
        psp.porcentaje = psp.diferencia_capacidad_asignaciones < 0 ?
          settings.porcentaje_fuera_capacidad - ((settings.diferencia_entre_secciones_aulas/aulas.length)*j)
          : 1 - (settings.diferencia_entre_secciones_aulas*j)
        if(psp.diferencia_capacidad_asignaciones < 0){
          psp.porcentaje = psp.porcentaje > 0 ? psp.porcentaje : 0
          psp.errores.push({
            tipo: "Sobrepoblación",
            descripcion: "La sección tiene asignados más alumnos de la capacidad máxima del aula",
            grave: true
          })
        } else if(psp.porcentaje < settings.minimo_porcentaje_secciones_chicas) {
          psp.porcentaje = settings.minimo_porcentaje_secciones_chicas
        }
      }
      aulasSeccionesPorcentage.push(seccionp);
    }
    return aulasSeccionesPorcentage;
  }

  createPorcentajeMaterias(probabilidadSeccionAulas: Array<SeccionAulasProbabilidad>, aulas: Aula[], settings: SettingsDto): Array<AulaSeccionProbabilidad> {
    let aulasSeccionesPorcentage: Array<AulaSeccionProbabilidad> = []
    for (let i = 0; i < aulas.length; i++) {
      const aula = aulas[i];
      let aulap: AulaSeccionProbabilidad = {
        aula: aula,
        porcentajeSecciones: []
      };
      for (let j = 0; j < probabilidadSeccionAulas.length; j++) {
        const psa = probabilidadSeccionAulas[j];
        for (let k = 0; k < psa.porcentajeAulas.length; k++) {
          const pa = psa.porcentajeAulas[k];
          if(pa.aula.id === aula.id){
            aulap.porcentajeSecciones.push(pa)
            break
          }
        }
      }
      aulasSeccionesPorcentage.push(aulap)
    }
    return aulasSeccionesPorcentage;
    /*let aulasSeccionesPorcentage: Array<AulaSeccionProbabilidad> = []
    for (let i = 0; i < aulas.length; i++) {
      const aula = aulas[i];
      let aulap: AulaSeccionProbabilidad = {
        aula: aula,
        porcentajeSecciones: []
      };
      for (let j = 0; j < secciones.length; j++) {
        const seccion = secciones[j];
        const psp: PorcentajeSeccionPeriodo = {
          aula: aula,
          seccion: seccion,
          diferencia_capacidad_asignaciones: aula.capacidad - seccion.asignados,
          errores: [],
          avisos: []
        };
        aulap.porcentajeSecciones.push(psp);
      }
      aulap.porcentajeSecciones.sort((a: PorcentajeSeccionPeriodo, b:PorcentajeSeccionPeriodo): number => {
        if (a.diferencia_capacidad_asignaciones < 0 && b.diferencia_capacidad_asignaciones >= 0) return 1
        else if (a.diferencia_capacidad_asignaciones >= 0 && b.diferencia_capacidad_asignaciones < 0) return -1
        else if (a.diferencia_capacidad_asignaciones < 0 && b.diferencia_capacidad_asignaciones < 0) return (a.diferencia_capacidad_asignaciones*-1) - (b.diferencia_capacidad_asignaciones*-1)
        return a.diferencia_capacidad_asignaciones - b.diferencia_capacidad_asignaciones
      })
      for (let j = 0; j < aulap.porcentajeSecciones.length; j++) {
        const psp = aulap.porcentajeSecciones[j];
        psp.porcentaje = psp.diferencia_capacidad_asignaciones < 0 ?
          settings.porcentaje_fuera_capacidad - ((settings.diferencia_entre_secciones_aulas/secciones.length)*j)
          : 1 - (settings.diferencia_entre_secciones_aulas*j)
        if(psp.diferencia_capacidad_asignaciones < 0){
          psp.porcentaje = psp.porcentaje > 0 ? psp.porcentaje : 0
          psp.errores.push({
            tipo: "Sobrepoblación",
            descripcion: "La sección tiene asignados más alumnos de la capacidad máxima del aula",
            grave: true
          })
        } else if(psp.porcentaje < settings.minimo_porcentaje_secciones_chicas) {
          psp.porcentaje = settings.minimo_porcentaje_secciones_chicas
        }
      }
      aulasSeccionesPorcentage.push(aulap);
    }
    return aulasSeccionesPorcentage;*/
  }

  createPorcentajesCombinados(pma: Array<AulaSeccionProbabilidad>, catedraticos: Catedratico[], settings: SettingsDto): Array<Hora> {
    let horario: Array<Hora> = []
    for (let i = 0; i < settings.periodos; i++) {
      let hora: Hora = {
        numPeriodo: i+1,
        periodos: []
      }
      for (let j = 0; j < pma.length; j++) {
        const asp = pma[j]
        let aulaProbabilidad: AulaProbabilidad = {
          aula: asp.aula,
          periodosProbables: [],
          numPeriodo: hora.numPeriodo
        }
        for (let k = 0; k < asp.porcentajeSecciones.length; k++) {
          const ps = asp.porcentajeSecciones[k]

          let periodoProbabilidad: Periodo = {
            aula: asp.aula,
            materia: ps.seccion.materia,
            seccion: ps.seccion,
            probabilidad: ps.porcentaje * settings.porcentaje_no_catedratico,
            numPeriodo: hora.numPeriodo,
            errores: [...ps.errores, {
              tipo: "No hay catedratico",
              descripcion: "Ningun catedratico está disponible esta hora",
              grave: true,
            }],
            avisos: ps.avisos
          }
          aulaProbabilidad.periodosProbables.push(periodoProbabilidad)

          for (let l = 0; l < catedraticos.length; l++) {
            let errores: Errores[] = []
            let avisos: Errores[] = []
            const catedratico = catedraticos[l]
            const matCat = catedratico.materias.find((m) => {return m.materia_id === ps.seccion.materia_id})
            let porcentajeCatP: number = settings.porcentaje_catedratico_opcional
            if(matCat && matCat.primario) {
              porcentajeCatP = 1
            } else if (matCat && !matCat.primario) {
              porcentajeCatP = settings.porcentaje_materia_secundaria
              avisos.push({
                tipo: 'Catedratico Materia Secundaria',
                descripcion: 'Catedratico tiene la materia asignada como secundaria',
                grave: false
              })
            } else {
              errores.push({
                tipo: 'Catedratico no Imparte esta Materia',
                descripcion: 'El catedratico no tiene la materia asignada ni siquiera como opcional',
                grave: true
              })
            }

            let porcentajeCatD: number
            if(catedratico.periodo_inicio <= hora.numPeriodo && catedratico.periodo_final >= hora.numPeriodo) {
              porcentajeCatD = 1
            } else {
              porcentajeCatD = settings.porcentaje_fuera_hora
              errores.push({
                tipo: 'Fuera de Horario Laboral',
                descripcion: 'El catedratico tiene un horario laboral que no coincide con esta hora'
              })
            }

            let periodoProbabilidad: Periodo = {
              aula: asp.aula,
              catedratico: catedratico,
              materia: ps.seccion.materia,
              seccion: ps.seccion,
              probabilidad: ps.porcentaje * porcentajeCatP * porcentajeCatD,
              numPeriodo: hora.numPeriodo,
              errores: [...ps.errores,...errores],
              avisos: [...ps.avisos,...avisos]
            }
            aulaProbabilidad.periodosProbables.push(periodoProbabilidad)
          }
          aulaProbabilidad.periodosProbables.sort((a: Periodo, b:Periodo): number => {
            return b.probabilidad - a.probabilidad
          })
        }
        hora.periodos.push(aulaProbabilidad)
      }
      horario.push(hora)
    }

    return horario
  }

  escogerMejorCaso(horas: Array<Hora>, noCaso: number): Periodo {
    let periodosOrdenados: Array<Periodo> = [];
    for (let i = 0; i < horas.length; i++) {
      const hora = horas[i];
      for (let j = 0; j < hora.periodos.length; j++) {
        const periodo = hora.periodos[j];
        for (let k = 0; k < periodo.periodosProbables.length; k++) {
          const pp = periodo.periodosProbables[k];
          periodosOrdenados.push({
            ...pp
          })
        }
      }
    }
    periodosOrdenados.sort((a: Periodo, b:Periodo): number => {
      return b.probabilidad - a.probabilidad
    })
    return periodosOrdenados.length > noCaso ? periodosOrdenados[noCaso] : null
  }

  eliminarSegúnMejorCaso(horas: Array<Hora>, mejorPeriodo: Periodo): Array<Hora> {
    let periodosOrdenados: Array<Hora> = [...horas];
    for (let i = 0; i < periodosOrdenados.length; i++) {
      const hora = periodosOrdenados[i];
      for (let j = 0; j < hora.periodos.length; j++) {
        const periodo = hora.periodos[j];
        let indexes: number[] = []
        for (let k = 0; k < periodo.periodosProbables.length; k++) {
          const pp = periodo.periodosProbables[k];
          if((pp.aula.id === mejorPeriodo.aula.id && pp.numPeriodo === mejorPeriodo.numPeriodo) ||
            (pp.seccion.id === mejorPeriodo.seccion.id) ||
            (pp.catedratico && pp.catedratico.id === mejorPeriodo.catedratico.id && pp.numPeriodo === mejorPeriodo.numPeriodo)) {
            indexes.push(k)
          }
        }
        periodo.periodosProbables = periodo.periodosProbables.filter((val, idx) => {
          return indexes.find((value) => value === idx) === undefined
        })
      }
    }
    return periodosOrdenados
  }

  crearHorarioSegunMejorCaso(horas: Array<Hora>, cantidadHorarios: number): Array<Horario> {
    let horarios: Array<Horario> = []
    for (let i = 0; i < cantidadHorarios; i++) {
      let copiaHoras = JSON.parse(JSON.stringify(horas))
      let periodosObtenidos: Array<Periodo> = []
      let mejorCaso = this.escogerMejorCaso(copiaHoras, i)
      while(mejorCaso) {
        periodosObtenidos.push({...mejorCaso})
        copiaHoras = this.eliminarSegúnMejorCaso(copiaHoras, mejorCaso)
        mejorCaso = this.escogerMejorCaso(copiaHoras, 0)
      }
      horarios.push({
        periodos: periodosObtenidos
      })
    }
    return horarios
  }

  crearHorarioFinales(aulas: Aula[], horarios: Horario[], secciones: Seccion[], settings: SettingsDto): Array<HorarioFinal> {
    let horariosFinales: Array<HorarioFinal> = []
    for (let h = 0; h < horarios.length; h++) {
      const horario = horarios[h];
      let horas: Array<Array<Periodo>> = []
      for (let i = 0; i < settings.periodos; i++) {
        let hora: Array<Periodo> = []
        for (let j = 0; j < aulas.length; j++) {
          const aula = aulas[j];
          let periodo: Periodo = {
            aula: aula,
            numPeriodo: i + 1
          }
          let periodoFind = this.encontrarMatch(horario, periodo)
          hora.push(periodoFind ? periodoFind : periodo)
        }
        horas.push(hora)
      }
      const seccionesNoEncontradas: Seccion[] = this.encontrarSeccionesNoAsignadas(secciones, horas)
      horariosFinales.push({
        horas: horas,
        aulas: aulas,
        periodos: settings.periodos,
        seccionesNoEncontradas: seccionesNoEncontradas
      })
    }
    return horariosFinales
  }

  encontrarMatch(horario: Horario, periodo: Periodo): Periodo {
    for (let j = 0; j < horario.periodos.length; j++) {
      const p = horario.periodos[j];
      if(p.aula.id === periodo.aula.id && p.numPeriodo === periodo.numPeriodo) {
        return p
      }
    }
    return undefined
  }

  encontrarSeccionesNoAsignadas(secciones: Seccion[], horas: Array<Array<Periodo>>): Seccion[] {
    let seccionesNoEncontradas: Seccion[] = []
    for (let i = 0; i < secciones.length; i++) {
      const seccion = secciones[i];
      let encontrada = false;
      for (let j = 0; j < horas.length; j++) {
        const hora = horas[j];
        for (let k = 0; k < hora.length; k++) {
          const periodo = hora[k];
          if(periodo.seccion && periodo.seccion.id === seccion.id) {
            encontrada = true;
            break;
          }
        }
        if(encontrada) break;
      }
      if(!encontrada) seccionesNoEncontradas.push(seccion);
    }
    return seccionesNoEncontradas
  }
}
