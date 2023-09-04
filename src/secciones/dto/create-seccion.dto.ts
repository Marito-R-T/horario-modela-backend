import { ApiProperty } from "@nestjs/swagger";

export class CreateSeccionDto {
  @ApiProperty({
    description: 'Cantidad de asignados',
  })
  asginados: number;
  
  @ApiProperty({
    description: 'Materia a la que pertenece la seccion',
  })
  materia_id: number;
}