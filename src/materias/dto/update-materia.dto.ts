import { ApiProperty } from "@nestjs/swagger";

export class UpdateMateriaDto {
  @ApiProperty({
    description: 'Nombre del curso',
  })
  nombre?: string;
  
  @ApiProperty({
    description: 'Carrera base del curso',
  })
  carrera_base?: string;
}