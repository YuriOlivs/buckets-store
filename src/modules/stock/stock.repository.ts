import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StockEntity } from "./stock.entity";
import ProductEntity from "../product/product.entity";

@Injectable()
export class StockRepository {
   constructor(
      @InjectRepository(StockEntity) private readonly repository: Repository<StockEntity>,
   ) { }

   async findAllProductStock(): Promise<StockEntity[]> {
      return await this.repository.find({ relations: ['product'] });
   }

   async findByProduct(productId: string): Promise<StockEntity | null> {
      return await this.repository.findOne({ where: { product: { id: productId } } });
   }

   async updateQuantity(items: StockEntity[]): Promise<StockEntity[]> {
      return await this.repository.save(items);
   }
}