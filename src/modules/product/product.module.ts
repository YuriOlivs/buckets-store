import { Module } from "@nestjs/common";
import ProductRepository from "./product.repository";
import ProductController from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import ProductEntity from "./product.entity";
import ProductService from "./product.service";

@Module({
   imports: [TypeOrmModule.forFeature([ProductEntity])],
   controllers: [ProductController],
   providers: [
      ProductService, 
      ProductRepository
   ]
})
export class ProductModule {};