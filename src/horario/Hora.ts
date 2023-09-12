import { AulaProbabilidad } from "./AulaProbabilidad"
import { Periodo } from "./Periodo"

export class Hora  {
  periodos!: Array<AulaProbabilidad>
  horaInicio?: Date
  horaFinal?: Date
  numPeriodo!: number
}