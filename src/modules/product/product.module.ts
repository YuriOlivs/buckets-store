import { Module } from "@nestjs/common";
import ProductRepository from "./product.repository";
import ProductController from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import ProductEntity from "./product.entity";
import ProductService from "./product.service";
import { TeamModule } from "../team/team.module";

@Module({
   imports: [
      TypeOrmModule.forFeature([ProductEntity]),
      TeamModule
   ],
   controllers: [ProductController],
   providers: [
      ProductService, 
      ProductRepository
   ]
})
export class ProductModule {};