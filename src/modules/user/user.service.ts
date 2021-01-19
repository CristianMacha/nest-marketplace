import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateUserDto, ReadUserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    const createdUser = await newUser.save();
    return createdUser;
  }

  async findAll(): Promise<ReadUserDto[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => plainToClass(ReadUserDto, user));
  }
}
