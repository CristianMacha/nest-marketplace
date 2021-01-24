import { IsArray, IsInstance, IsOptional, IsString } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';

import { Social } from '../interfaces/social.interface';
import { CreateProductDto } from 'src/modules/product/dto/product.dto';

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

  @IsOptional()
  @IsArray()
  @Type(() => CreateProductDto)
  @IsInstance(CreateProductDto, { each: true })
  products: CreateProductDto[];
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
