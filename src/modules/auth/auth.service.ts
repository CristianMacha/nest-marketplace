import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { ReadUserDto } from '../user/dto/user.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { ResponseSigninDto, SigninDto, SignupDto } from './dto/auth.dto';
import { comparePassword, encryptPassword } from './utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signin(signinDto: SigninDto) {
    const userdb = await this.userModel
      .findOne({ email: signinDto.email })
      .exec();
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
    const userdb = await this.userModel
      .findOne({ email: signupDto.email })
      .exec();
    if (userdb)
      throw new BadRequestException(`El email ${signupDto.email} ya existe.`);

    const hashPassword = await encryptPassword(signupDto.password);

    const newUser = new this.userModel(signupDto);
    newUser.password = hashPassword;
    const createdUser = await newUser.save();
    return createdUser;
  }
}
