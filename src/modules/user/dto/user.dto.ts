import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  names: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsString()
  names: string;

  @Expose()
  @IsEmail()
  email: string;
}
