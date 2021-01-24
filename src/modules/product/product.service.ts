import { Injectable } from '@nestjs/common';

import { StoreRepository } from '../store/store.repository';
import { UserRepository } from '../user/user.repository';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    private storeRepository: StoreRepository,
    private userRepository: UserRepository,
  ) {}

  async addProduct(user: any, createProductDto: CreateProductDto) {
    const userdb = await this.userRepository.findById(user._id);
    const storedb = await this.storeRepository.storeByIdUser(userdb);

    storedb.products.push(createProductDto);
    const aggregated = await this.storeRepository.save(storedb);
    return aggregated;
  }
}
