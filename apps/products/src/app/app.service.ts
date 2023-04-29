import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "./entities/product.entity";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsRepository.save(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productsRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<UpdateResult> {
    return await this.productsRepository.update(id, updateProductDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.productsRepository.softDelete(id);
  }

  async checkIfProductsExist(productIds: string[]): Promise<Product[]> {
    return await this.productsRepository.findByIds(productIds);
  }
}
