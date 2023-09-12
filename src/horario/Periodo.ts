import { Aula } from "src/aulas/aula.entity"
import { Catedratico } from "src/catedraticos/catedratico.entity"
import { Materia } from "src/materias/materia.entity"
import { Seccion } from "src/secciones/seccion.entity"

export class Periodo  {
  aula!: Aula
  catedratico?: Catedratico
  seccion?: Seccion
  materia?: Materia
  probabilidad?: number
  numPeriodo?: number
}