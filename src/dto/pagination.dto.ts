import { ApiProperty } from "@nestjs/swagger";

export class Pagination {
  @ApiProperty({
    description: 'Número de datos a regresar',
  })
  number: number;
  
  @ApiProperty({
    description: 'Página a regresar',
  })
  page: number;
}