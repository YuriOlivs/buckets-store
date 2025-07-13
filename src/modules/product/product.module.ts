import { Module } from "@nestjs/common";
import ProductRepository from "./product.repository";
import ProductController from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import ProductEntity from "./product.entity";

@Module({
   imports: [TypeOrmModule.forFeature([ProductEntity])],
   controllers: [ProductController],
   providers: [ProductRepository]
})
export class ProductModule {};