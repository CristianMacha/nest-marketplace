import { Injectable } from '@nestjs/common';

import { CreateUserDto, ReadUserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { plainToClass } from 'class-transformer';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.create(createUserDto);
    const createdUser = await this.userRepository.save(newUser);
    return createdUser;
  }

  async findAll(): Promise<ReadUserDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => plainToClass(ReadUserDto, user));
  }
}
