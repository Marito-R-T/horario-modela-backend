import { ApiProperty } from "@nestjs/swagger";

export class CreateCatedraticoDto {
  @ApiProperty({
    description: 'Nombre del catedratico',
  })
  nombre: string;
}