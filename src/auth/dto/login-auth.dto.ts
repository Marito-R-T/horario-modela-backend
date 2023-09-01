import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class LoginAuthDto  {
  @ApiProperty({
    description: 'Username unique del usuario',
  })
  @IsNotEmpty()
  username: string

  @ApiProperty({
    description: 'Password del usuario',
  })
  @IsNotEmpty()
  password: string
}