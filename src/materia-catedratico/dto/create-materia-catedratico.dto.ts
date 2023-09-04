import { ApiProperty } from "@nestjs/swagger";

export class CreateMateriaCatedraticoDto {
  @ApiProperty({
    description: 'Id del catedratico que puede impartir la materia',
  })
  catedratico_id: number;
  
  @ApiProperty({
    description: 'Id de la materia que el catedratico podría impartir',
  })
  materia_id: number;
  
  @ApiProperty({
    description: 'Ver si es una materia prioritaria para el catedratico',
  })
  primario: boolean;
}