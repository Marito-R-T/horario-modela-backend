import { Aula } from "src/aulas/aula.entity"
import { PorcentajeSeccionPeriodo } from "./dto/porcentaje-seccion-periodo"
import { Seccion } from "src/secciones/seccion.entity"

export class AulaSeccionProbabilidad  {
  porcentajeSecciones!: Array<PorcentajeSeccionPeriodo>
  aula!: Aula
}

export class SeccionAulasProbabilidad  {
  porcentajeAulas!: Array<PorcentajeSeccionPeriodo>
  seccion!: Seccion
}