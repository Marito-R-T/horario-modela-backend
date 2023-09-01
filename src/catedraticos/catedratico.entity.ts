import { MateriaCatedratico } from '../materia-catedratico/materia-catedratico.entity'
import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity({ name: 'catedratico' })
export class Catedratico {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => MateriaCatedratico, mc => mc.catedratico)
  materias: MateriaCatedratico[]
}