import { Injectable } from "@nestjs/common";
import ProductCreateDTO from "./dto/ProductCreate.dto";
import ProductEntity from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export default class ProductRepository {
   constructor(
      @InjectRepository(ProductEntity) private readonly repository: Repository<ProductEntity>
   ) {}

   async save(product: ProductEntity): Promise<ProductEntity> {
      return await this.repository.save(product);
   }

   async getAll(): Promise<ProductEntity[]> {
      return await this.repository.find();
   }

   async getById(id: string): Promise<ProductEntity | null> {
      return await this.repository.findOne({ where: { id } });
   }

   async getByTeam(id: string): Promise<ProductEntity[]> {
      return await this.repository.find({ where: { teamId: id } });
   }

   async remove(id: string) {
      return await this.repository.delete({ id });
   }
}