import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtAuthService:JwtService
  ) {}

  async register(userObject: RegisterAuthDto) {
    const { password } = userObject;
    const plainToHash = await hash(password, 10);
    userObject = {...userObject, password:plainToHash};
    const newUser = this.userRepository.create(userObject);
    return this.userRepository.save(newUser);
  }

  async login(userObjectLogin: LoginAuthDto) {
    const {username, password} = userObjectLogin;
    console.log(username)
    const findUser = await this.userRepository.findOne({ where: { username: username } });
    if(!findUser) throw new HttpException('Ususario no encontrado', 404);

    const checkPassword = await compare(password, findUser.password);
    if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

    const payload = {id:findUser.id, username:findUser.username}
    const token = await this.jwtAuthService.sign(payload)

    const data = {
      user: findUser,
      token: token,
    };

    return data;

  }

}
