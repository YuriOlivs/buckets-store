import { Injectable } from "@nestjs/common";
import ProductEntity from "./product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindOptionsWhere, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import ProductFilterDTO from "./dto/product-filter.dto";
import rankedSearch from "src/common/utils/ranked-search.util";

@Injectable()
export default class ProductRepository {
   constructor(
      @InjectRepository(ProductEntity) private readonly repository: Repository<ProductEntity>
   ) { }

   async save(product: ProductEntity): Promise<ProductEntity> {
      return await this.repository.save(product);
   }

   async getAll(filters: ProductFilterDTO): Promise<ProductEntity[]> {
      const where: FindOptionsWhere<ProductEntity> = {};

      if (filters.category) { where.category = filters.category; }
      if (filters.subcategory) { where.subcategory = filters.subcategory; }
      if (filters.team) { where.team = { id: filters.team }; }

      if (filters.minPrice && filters.maxPrice) {
         where.price = Between(filters.minPrice, filters.maxPrice);
      } else if (filters.minPrice) {
         where.price = MoreThanOrEqual(filters.minPrice);
      } else if (filters.maxPrice) {
         where.price = LessThanOrEqual(filters.maxPrice);
      }

      const products = await this.repository.find({ where });

      if (filters.name) {
         return products.filter(product => rankedSearch(product.name, filters.name) > 0.85);
      }

      return products;
   }

   async getById(id: string): Promise<ProductEntity | null> {
      return await this.repository.findOne({ where: { id } });
   }

   async getByTeam(id: string): Promise<ProductEntity[]> {
      return await this.repository.find({ where: { team: { id } } });
   }

   async remove(product: ProductEntity) {
      return await this.repository.softRemove(product);
   }
}