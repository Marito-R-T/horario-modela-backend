import { User } from "src/users/user.entity";
import { UserDto } from "src/users/dto/user.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
  @ApiProperty({
    description: 'Titulo del libro',
  })
  title: string;
  
  @ApiProperty({
    description: 'Descripción del libro',
  })
  description: string;
  
  @ApiProperty({
    description: 'Nombre del autor del libro',
  })
  authorName: string;
  
  @ApiProperty({
    description: 'Fecha de publicación del libro',
  })
  publicationDate?: string;
  
  @ApiProperty({ 
    type: () => UserDto,
    description: 'Usuario que reservó este libro',
  })
  reservedByUser?: User;
}