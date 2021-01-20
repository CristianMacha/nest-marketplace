import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Roles {
  USER = 'USER',
  OWNER = 'OWNER',
  ROOT = 'ROOT',
  ADMIN = 'ADMIN',
}

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class User {
  @Prop({ required: true })
  names: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ enum: Roles, default: 'USER' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
