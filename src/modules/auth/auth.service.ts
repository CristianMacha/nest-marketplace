import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

import { ReadUserDto } from '../user/dto/user.dto';
import { ResponseSigninDto, SigninDto, SignupDto } from './dto/auth.dto';
import { comparePassword, encryptPassword } from './utils/bcrypt';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const userdb = await this.userRepository.findByEmail(signinDto.email);
    if (!userdb)
      throw new BadRequestException('Credenciales incorrectos - email');

    const isMatchPassword = await comparePassword(
      signinDto.password,
      userdb.password,
    );
    if (!isMatchPassword)
      throw new BadRequestException('Credenciales incorrectos - password');

    const payload = { sub: userdb._id, names: userdb.names };
    const token = this.jwtService.sign(payload);
    const user = plainToClass(ReadUserDto, userdb);

    return plainToClass(ResponseSigninDto, { token, user });
  }

  async signup(signupDto: SignupDto): Promise<ReadUserDto> {
    const userdb = await this.userRepository.findByEmail(signupDto.email);
    if (userdb)
      throw new BadRequestException(`El email ${signupDto.email} ya existe.`);

    const hashPassword = await encryptPassword(signupDto.password);

    const newUser = await this.userRepository.create(signupDto);
    newUser.password = hashPassword;
    const createdUser = await this.userRepository.save(newUser);
    return createdUser;
  }
}
