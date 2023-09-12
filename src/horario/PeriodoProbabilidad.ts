
import { Aula } from "src/aulas/aula.entity"
import { Periodo } from "./Periodo"

export class PeriodoProbabilidad  {
  periodo!: number
  aula!: Aula
  probabilidades?: Periodo[]
}