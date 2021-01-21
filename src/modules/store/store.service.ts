import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { CreateStoreDto, ReadStoreDto } from './dto/store.dto';
import { StoreRepository } from './store.repository';

@Injectable()
export class StoreService {
  constructor(private storeRepository: StoreRepository) {}

  async create(createStoreDto: CreateStoreDto, user: any) {
    const storedb = await this.storeRepository.findByRuc(createStoreDto.ruc);

    if (storedb) throw new BadRequestException('La tienda ya esta registrada.');

    const newStore = await this.storeRepository.create(createStoreDto);
    newStore.user = user;
    const createdStore = await this.storeRepository.save(newStore);

    return plainToClass(ReadStoreDto, createdStore);
  }

  async findAll() {
    const storesdb = await this.storeRepository.findAll();
    return storesdb.map((store) => plainToClass(ReadStoreDto, store));
  }
}
