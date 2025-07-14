import { Injectable } from "@nestjs/common";
import ProductEntity from "./product.entity";
import ProductRepository from "./product.repository";
@Injectable()
export default class ProductService {
   constructor (private repo: ProductRepository) {}

   async getAllProducts() {
      return await this.repo.getAll();
   }

   async getProductById(id: string) {
      return await this.repo.getById(id);
   }

   async createProduct(product: ProductEntity) {
      return await this.repo.save(product);
   }

   async updateProduct(id: string, productData: Partial<ProductEntity>) {
      const productFound = await this.repo.getById(id);
      if (!productFound) throw new Error('Product not found');

      if (productData.getName) productFound.setName(productData.getName);
      if (productData.getDescription) productFound.setDescription(productData.getDescription);
      if (productData.getCategory) productFound.setCategory(productData.getCategory);
      if (productData.getSubcategory) productFound.setSubcategory(productData.getSubcategory);
      if (productData.getPrice) productFound.setPrice(productData.getPrice);
      if (productData.getTeamId) productFound.setTeamId(productData.getTeamId);
      if (productData.getImages) productFound.setImages(productData.getImages);

      return await this.repo.save(productFound);
   }

   async deleteProduct(id: string) {
      const productFound = await this.repo.getById(id);
      if (!productFound) throw new Error('Product not found');
      
      return await this.repo.remove(id);
   }
}