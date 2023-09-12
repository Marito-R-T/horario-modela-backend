import { ApiProperty } from "@nestjs/swagger";

export class SettingsDto {
  @ApiProperty({
    description: 'Número de periodos',
  })
  periodos!: number;

  @ApiProperty({
    description: 'Porcentaje de validez si el curso no lo tiene el catedratico',
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

  @ApiProperty({
    description: 'Porcentaje de validez si el curso es secundario para el catedratico',
  })
  porcentaje_materia_secundaria?: number;

  @ApiProperty({
    description: 'Porcentaje limite inferior de las secciones pequeñas si estan alejadas del tope.',
  })
  minimo_porcentaje_secciones_chicas: number;

  @ApiProperty({
    description: 'Porcentaje de diferencia que se tendra entre cada sección que este más alejada del número de capacidad del aula.',
  })
  diferencia_entre_secciones_aulas: number;

  @ApiProperty({
    description: 'Cantidad de horarios posibles',
  })
  cantidad_horarios: number;
}