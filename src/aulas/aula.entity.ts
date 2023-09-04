import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({ name: 'aula' })
export class Aula {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string
  
  @Column("int")
  capacidad: number
}