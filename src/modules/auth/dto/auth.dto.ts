import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ReadUserDto } from 'src/modules/user/dto/user.dto';

import { Roles } from '../../user/schemas/user.schema';

export class SignupDto {
  @IsString()
  names: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Roles)
  role: Roles;
}

export class SigninDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

@Exclude()
export class ResponseSigninDto {
  @Expose()
  @IsString()
  token: string;

  @Expose()
  user: ReadUserDto;
}
