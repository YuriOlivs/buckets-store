import { Module } from "@nestjs/common";
import ProductRepository from "./product.repository";
import ProductController from "./product.controller";

@Module({
   controllers: [ProductController],
   providers: [ProductRepository]
})
export class ProductModule {};