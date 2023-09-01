import { Materia } from '../materias/materia.entity'
import { Catedratico } from '../catedraticos/catedratico.entity'
import {Entity, Column, ManyToOne, PrimaryColumn, JoinColumn, PrimaryGeneratedColumn, Unique} from 'typeorm'

@Entity({ name: 'materiacatedratico' })
export class MateriaCatedratico {
  @PrimaryColumn()
  catedratico_id: number;

  @PrimaryColumn()
  materia_id: number;

  @Column()
  primario: boolean

  @ManyToOne(() => Catedratico, catedratico => catedratico.materias, {nullable: false})
  @JoinColumn({name: "catedratico_id", referencedColumnName: "id"})
  catedratico: Catedratico
  
  @ManyToOne(() => Materia, materia => materia.catedraticos, {nullable: false})
  @JoinColumn({name: "materia_id", referencedColumnName: "id"})
  materia: Materia
}