import { ApiProperty } from "@nestjs/swagger";

export class UpdateCatedraticoDto {
  @ApiProperty({
    description: 'Nombre del catedratico',
  })
  nombre?: string;
}