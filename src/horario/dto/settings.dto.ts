import { ApiProperty } from "@nestjs/swagger";

export class SettingsDto {
  @ApiProperty({
    description: 'Número de periodos',
  })
  periodos!: number;

  @ApiProperty({
    description: 'Porcentaje de validez si es curso opcional',
  })
  porcentaje_catedratico_opcional?: number;

  @ApiProperty({
    description: 'Porcentaje de validez si el catedratico esta fuera de hora',
  })
  porcentaje_fuera_hora?: number;

  @ApiProperty({
    description: 'Porcentaje de validez si la seccion esta fuera del rango de capacidad',
  })
  porcentaje_fuera_capacidad?: number;
}