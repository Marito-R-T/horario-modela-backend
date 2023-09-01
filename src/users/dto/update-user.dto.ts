import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiProperty({
    description: 'Username unique del usuario',
  })
  username?: string;
  
  @ApiProperty({
    description: 'Password del usuario',
  })
  password?: string;
}