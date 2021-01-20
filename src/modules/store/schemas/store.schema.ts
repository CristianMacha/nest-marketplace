import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../user/schemas/user.schema';
import { Social } from '../interfaces/social.interface';

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
}

export const StoreSchema = SchemaFactory.createForClass(Store);
