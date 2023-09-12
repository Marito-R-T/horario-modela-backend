import { Aula } from "src/aulas/aula.entity"
import { PorcentajeSeccionPeriodo } from "./dto/porcentaje-seccion-periodo"

export class AulaSeccionProbabilidad  {
  porcentajeSecciones!: Array<PorcentajeSeccionPeriodo>
  aula!: Aula
}