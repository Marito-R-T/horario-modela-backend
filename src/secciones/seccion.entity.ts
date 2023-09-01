import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({ name: 'seccion' })
export class Seccion {
  @PrimaryGeneratedColumn()
  id: number

  @Column("char", {length: 1})
  letra: string
  
  @Column()
  numero: number

  @Column()
  asignados: number
}