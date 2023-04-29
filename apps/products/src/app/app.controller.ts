import {  Controller } from "@nestjs/common";

import { AppService } from './app.service';
import { DeleteResult, UpdateResult } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./entities/product.entity";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('product_check_exists')
  checkExistingProduct(@Payload() productIds: string[]): Promise<Product[]> {
    return this.appService.checkIfProductsExist(productIds);
  }

  @MessagePattern('product_create')
  create(@Payload() createProductDto: CreateProductDto): Promise<Product> {
    return this.appService.create(createProductDto);
  }

  @MessagePattern('product_find_all')
  findAll(): Promise<Product[]> {
    return this.appService.findAll();
  }

  @MessagePattern('product_find_once')
  findOne(@Payload() id: string): Promise<Product> {
    return this.appService.findOne(id);
  }

  @MessagePattern('product_update')
  update(
    @Payload() payload: string,
  ): Promise<UpdateResult> {
    const {id, data} = JSON.parse(payload);
    return this.appService.update(id, data);
  }

  @MessagePattern('product_delete')
  remove(@Payload() id: string): Promise<DeleteResult> {
    return this.appService.remove(id);
  }
}
