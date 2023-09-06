import { Aula } from "src/aulas/aula.entity"
import { Catedratico } from "src/catedraticos/catedratico.entity"
import { Seccion } from "src/secciones/seccion.entity"

export class PorcentajeSeccionPeriodo  {
  aula!: Aula
  seccion!: Seccion
  porcentaje?: number
  diferencia_capacidad_asignaciones!: number
}