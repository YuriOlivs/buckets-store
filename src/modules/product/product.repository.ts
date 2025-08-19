import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import rankedSearch from "src/common/utils/ranked-search.util";
import { Between, FindOptionsWhere, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import ProductFilterDTO from "./dto/product-filter.dto";
import ProductEntity from "./product.entity";

@Injectable()
export default class ProductRepository {
   constructor(
      @InjectRepository(ProductEntity) private readonly repository: Repository<ProductEntity>
   ) { }

   async save(product: ProductEntity): Promise<ProductEntity> {
      return await this.repository.save(product);
   }

   async getAll(filters: ProductFilterDTO): Promise<[ProductEntity[], number]> {
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

      const page = filters.page || 1;
      const limit = filters.limit || 50;

      const [products, total] = await this.repository.findAndCount({
         where,
         skip: (page - 1) * limit,
         take: limit,
         order: { createdAt: 'DESC' }
      });

      let filteredProducts = products;
      if (filters.name) {
         filteredProducts = products.filter(
            product => rankedSearch(product.name, filters.name) > 0.85
         );
      }

      return [filteredProducts, total];
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