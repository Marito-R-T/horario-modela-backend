import { Aula } from "src/aulas/aula.entity"
import { Periodo } from "./Periodo"
import { PeriodoProbabilidad } from "./PeriodoProbabilidad"

export class AulaProbabilidad  {
  periodosProbables!: Array<Periodo>
  numPeriodo!: number
  aula!: Aula
}