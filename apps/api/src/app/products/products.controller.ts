import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, Inject
} from "@nestjs/common";
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { Product } from './entities/product.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('PRODUCT_MICROSERVICE') private readonly productsService: ClientProxy,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return firstValueFrom(this.productsService.send('product_create', createProductDto));
  }

  @Get()
  findAll(): Promise<Product[]> {
    return firstValueFrom(this.productsService.send('product_find_all', ''));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return firstValueFrom(this.productsService.send('product_find_once', id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    const payload = {
      id,
      data: updateProductDto,
    }
    return firstValueFrom(this.productsService.send('product_update', JSON.stringify(payload)));
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return firstValueFrom(this.productsService.send('product_delete', id));
  }
}
