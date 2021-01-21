import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: any) {
    const newUser = new this.userModel(user);
    return newUser;
  }

  async save(userDocument: UserDocument) {
    const createdUser = await userDocument.save();
    return createdUser;
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }
}
