import { Module } from "@nestjs/common";
import ProductRepository from "./product.repository";
import ProductController from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import ProductEntity from "./product.entity";
import ProductService from "./product.service";
import TeamService from "../team/team.service";

@Module({
   imports: [
      TypeOrmModule.forFeature([ProductEntity]),
      TeamService
   ],
   controllers: [ProductController],
   providers: [
      ProductService, 
      ProductRepository
   ]
})
export class ProductModule {};