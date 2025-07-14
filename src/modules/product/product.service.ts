import { Injectable, NotFoundException } from "@nestjs/common";
import ProductEntity from "./product.entity";
import ProductRepository from "./product.repository";
import TeamService from "../team/team.service";
@Injectable()
export default class ProductService {
   constructor (
      private repo: ProductRepository,
      private teamService: TeamService
   ) {}

   async getAllProducts(): Promise<ProductEntity[]> {
      return await this.repo.getAll();
   }

   async getProductById(id: string): Promise<ProductEntity> {
      const productFound = await this.repo.getById(id);
      if (!productFound) throw new NotFoundException('Product not found')
      
      return productFound;
   }

   async getProductByTeam(id: string): Promise<ProductEntity[]> {
      const teamFound = await this.teamService.getTeamById(id);
      if (!teamFound) throw new NotFoundException('Team not found');

      return await this.repo.getByTeam(id);
   }

   async createProduct(product: ProductEntity): Promise<ProductEntity> {
      const teamFound = await this.teamService.getTeamById(product.getTeamId);
      if (!teamFound) throw new NotFoundException('Team not found');

      return await this.repo.save(product);
   }

   async updateProduct(id: string, productData: Partial<ProductEntity>): Promise<ProductEntity> {
      const productFound = await this.repo.getById(id);
      if (!productFound) throw new NotFoundException('Product not found');

      if (productData.getName) productFound.setName(productData.getName);
      if (productData.getDescription) productFound.setDescription(productData.getDescription);
      if (productData.getCategory) productFound.setCategory(productData.getCategory);
      if (productData.getSubcategory) productFound.setSubcategory(productData.getSubcategory);
      if (productData.getPrice) productFound.setPrice(productData.getPrice);
      if (productData.getImages) productFound.setImages(productData.getImages);
      if (productData.getTeamId) {
         const teamFound = await this.teamService.getTeamById(productData.getTeamId);
         if (!teamFound) throw new NotFoundException('Team not found');
         
         productFound.setTeamId(productData.getTeamId);
      }

      return await this.repo.save(productFound);
   }

   async deleteProduct(id: string) {
      const productFound = await this.repo.getById(id);
      if (!productFound) throw new NotFoundException('Product not found');
      
      return await this.repo.remove(id);
   }
}