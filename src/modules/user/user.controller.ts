import { Body, Controller, Get, Post } from '@nestjs/common';

import { ValidationPipe } from '../../pipes/validation.pipe';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userServices: UserService) {}

  @Post('create')
  async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const response = await this.userServices.create(createUserDto);
    return response;
  }

  @Get('list')
  async findAll() {
    const response = await this.userServices.findAll();
    return response;
  }
}
