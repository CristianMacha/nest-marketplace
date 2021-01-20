import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateStoreDto } from './dto/store.dto';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private storeServices: StoreService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(
    @Body(new ValidationPipe()) createStoreDto: CreateStoreDto,
    @Request() req,
  ) {
    const response = await this.storeServices.create(createStoreDto, req.user);
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  async findAll() {
    const response = await this.storeServices.findAll();
    return response;
  }
}
