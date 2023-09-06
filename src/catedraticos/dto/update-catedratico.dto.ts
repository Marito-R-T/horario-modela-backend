import { ApiProperty } from "@nestjs/swagger";

export class UpdateCatedraticoDto {
  @ApiProperty({
    description: 'Nombre del catedratico',
  })
  nombre?: string;

  @ApiProperty({
    description: 'Periodo de inicio',
  })
  periodo_inicio?: number;
  
  @ApiProperty({
    description: 'Periodo de salida',
  })
  periodo_final?: number;
}