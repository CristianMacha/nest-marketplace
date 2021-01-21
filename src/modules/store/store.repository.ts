import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Store, StoreDocument } from './schemas/store.schema';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
  ) {}

  async create(store: any) {
    const newStore = new this.storeModel(store);
    return newStore;
  }

  async save(storeDocument: StoreDocument) {
    const createdStore = storeDocument.save();
    return createdStore;
  }

  async findByRuc(ruc: string) {
    const store = await this.storeModel.findOne({ ruc }).exec();
    return store;
  }

  async findAll() {
    const stores = await this.storeModel.find().exec();
    return stores;
  }
}
