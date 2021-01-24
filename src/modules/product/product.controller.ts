import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { ValidationPipe } from '../../pipes/validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productServices: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addProduct(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
    @Request() req,
  ) {
    const response = await this.productServices.addProduct(
      req.user,
      createProductDto,
    );
    return response;
  }
}
