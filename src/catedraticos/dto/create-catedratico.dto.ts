import { ApiProperty } from "@nestjs/swagger";

export class CreateCatedraticoDto {
  @ApiProperty({
    description: 'Nombre del catedratico',
  })
  nombre: string;

  @ApiProperty({
    description: 'Periodo de inicio',
  })
  periodo_inicio: number;
  
  @ApiProperty({
    description: 'Periodo de salida',
  })
  periodo_final: number;
}