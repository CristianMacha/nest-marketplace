import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Store, StoreSchema } from './schemas/store.schema';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { StoreRepository } from './store.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema}])
  ],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository],
  exports: [StoreRepository]
})
export class StoreModule {}
