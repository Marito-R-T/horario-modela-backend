import { Materia } from '../materias/materia.entity'
import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn} from 'typeorm'

@Entity({ name: 'seccion' })
export class Seccion {
  @PrimaryColumn()
  numero: number

  @Column()
  asignados: number

  @Column()
  materia_id: number;
  
  @ManyToOne(() => Materia, materia => materia.catedraticos, {nullable: false})
  @JoinColumn({name: "materia_id", referencedColumnName: "id"})
  materia: Materia
}