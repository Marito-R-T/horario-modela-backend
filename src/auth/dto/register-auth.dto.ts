import { PartialType } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';
import { ApiProperty } from "@nestjs/swagger";


export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  @ApiProperty({
    description: 'Password del usuario',
  })
  @IsNotEmpty()
  username: string
}