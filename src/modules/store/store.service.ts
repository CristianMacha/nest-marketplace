import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { CreateStoreDto, ReadStoreDto } from './dto/store.dto';
import { Store, StoreDocument } from './schemas/store.schema';

@Injectable()
export class StoreService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
  ) {}

  async create(createStoreDto: CreateStoreDto, user: any) {
    const storedb = await this.storeModel
      .findOne({ ruc: createStoreDto.ruc })
      .exec();
    if (storedb) throw new BadRequestException('La tienda ya esta registrada.');

    const newStore = new this.storeModel(createStoreDto);
    newStore.user = user;
    const createdStore = await newStore.save();

    return plainToClass(ReadStoreDto, createdStore);
  }

  async findAll() {
    const storesdb = await this.storeModel.find().exec();
    console.log(storesdb);
    
    return storesdb.map((store) => plainToClass(ReadStoreDto, store));
  }
}
