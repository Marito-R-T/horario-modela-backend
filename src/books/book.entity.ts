import {Entity, Column, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string
  
  @Column()
  description: string

  @Column()
  authorName: string
  
  @Column({
    type: 'datetime',
    nullable: true
  })
  publicationDate: Date
  
  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP'
  })
  arrivalDate: Date
}