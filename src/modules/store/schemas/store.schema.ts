import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Product } from '../../product/schemas/product.schema';
import { Social } from '../interfaces/social.interface';
import { User } from '../../user/schemas/user.schema';

export type StoreDocument = Store & mongoose.Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  ruc: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ type: Array })
  social: [Social];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: Product.name }] })
  products: Product[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
