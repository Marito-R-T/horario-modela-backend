import { Aula } from "src/aulas/aula.entity";
import { Hora } from "./Hora";
import { Periodo } from "./Periodo";
import { Seccion } from "src/secciones/seccion.entity";

export class Horario {
  periodos!: Array<Periodo>
}

export class HorarioFinal {
  horas!: Array<Array<Periodo>>
  aulas!: Array<Aula>
  periodos!: number
  seccionesNoEncontradas!: Array<Seccion>
  porcentajeAcierto!: number
}