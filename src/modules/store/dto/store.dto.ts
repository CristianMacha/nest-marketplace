import {
  IsArray,
  IsInstance,
  IsObject,
  IsString,
  Validate,
} from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

import { Social } from '../interfaces/social.interface';
import { ReadUserDto } from 'src/modules/user/dto/user.dto';
import { User } from 'src/modules/user/schemas/user.schema';

class ReadSocial {
  name: string;
  url: string;
}

export class CreateStoreDto {
  @IsString()
  name: string;

  @IsString()
  ruc: string;

  @IsString()
  location: string;

  @IsString()
  phone: string;

  @IsArray()
  @Type(() => ReadSocial)
  @IsInstance(ReadSocial, { each: true })
  social: Social[];
}

@Exclude()
export class ReadStoreDto {
  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsString()
  ruc: string;

  @Expose()
  @IsString()
  location: string;

  @Expose()
  @IsString()
  phone: string;

  @Expose()
  @IsArray()
  social: Social[];
}
