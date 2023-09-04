import { ApiProperty } from "@nestjs/swagger";

export class CreateMateriaDto {
  @ApiProperty({
    description: 'Nombre del curso',
  })
  nombre: string;
  
  @ApiProperty({
    description: 'Carrera base del curso',
  })
  carrera_base: string;
}