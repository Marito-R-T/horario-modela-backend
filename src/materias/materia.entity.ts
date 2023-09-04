import { Seccion } from '../secciones/seccion.entity'
import { MateriaCatedratico } from '../materia-catedratico/materia-catedratico.entity'
import {Entity, Column, OneToMany, PrimaryGeneratedColumn} from 'typeorm'

@Entity({ name: 'materia' })
export class Materia {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string
  
  @Column()
  carrera_base: string
  
  @OneToMany(() => MateriaCatedratico, mc => mc.materia)
  catedraticos: MateriaCatedratico[]
  
  @OneToMany(() => Seccion, seccion => seccion.id)
  seccion: Seccion[]
}