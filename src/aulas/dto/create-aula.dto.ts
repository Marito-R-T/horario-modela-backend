import { ApiProperty } from "@nestjs/swagger";

export class CreateAulaDto {
  @ApiProperty({
    description: 'Nombre o identificador del aula',
  })
  nombre: string;

  @ApiProperty({
    description: 'Capacidad del aula',
  })
  capacidad: number;
}