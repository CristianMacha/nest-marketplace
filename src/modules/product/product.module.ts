import { Module } from '@nestjs/common';

import { Product, ProductSchema } from './schemas/product.schema';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';
import { StoreModule } from '../store/store.module';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    StoreModule,
    UserModule,
  ],
  providers: [ProductService, ProductRepository],
  controllers: [ProductController],
})
export class ProductModule {}
