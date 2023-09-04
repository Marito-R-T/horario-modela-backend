import { Materia } from '../materias/materia.entity'
import {Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn} from 'typeorm'

@Entity({ name: 'seccion' })
export class Seccion {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  asignados: number

  @Column()
  materia_id: number;
  
  @ManyToOne(() => Materia, materia => materia.catedraticos, {nullable: false})
  @JoinColumn({name: "materia_id", referencedColumnName: "id"})
  materia: Materia
}