import { Injectable, NotFoundException } from "@nestjs/common";
import ProductEntity from "./product.entity";
import ProductRepository from "./product.repository";
import TeamService from "../team/team.service";
import ImageService from "../image/image.service";
import ImageEntity from "../image/image.entity";
@Injectable()
export default class ProductService {
   constructor (
      private repo: ProductRepository,
      private teamService: TeamService,
      private imgService: ImageService
   ) {}

   async getAllProducts(): Promise<ProductEntity[]> {
      const products = await this.repo.getAll();
      products.map(async product => {
         const images = await this.imgService.getImagesByProduct(product.id);
         if(images) product.setImages(images);
      });

      return products;
   }

   async getProductById(id: string): Promise<ProductEntity> {
      const productFound = await this.repo.getById(id);
      if (!productFound) throw new NotFoundException('Product not found')

      const images = await this.imgService.getImagesByProduct(productFound.id);
      if(images) productFound.setImages(images);
      
      return productFound;
   }

   async getProductByTeam(id: string): Promise<ProductEntity[]> {
      const teamFound = await this.teamService.getTeamById(id);
      if (!teamFound) throw new NotFoundException('Team not found');

      const products = await this.repo.getByTeam(id);
      products.map(async product => {
         const images = await this.imgService.getImagesByProduct(product.id);
         if(images) product.setImages(images);
      });

      return products;      
   }

   async createProduct(product: ProductEntity): Promise<ProductEntity> {
      const images: ImageEntity[] = [];
      const teamFound = await this.teamService.getTeamById(product.getTeamId);
      if (!teamFound) throw new NotFoundException('Team not found');

      for (const image of product.getImages) {
         let img: ImageEntity;
         const urlExists = await this.imgService.getImageByUrl(image.url);
         if(urlExists) {
            if(image.description != urlExists.description) urlExists.description = image.description;
            img = urlExists;
         }
         else {
            img = await this.imgService.createImage(image) as ImageEntity;
         }

         images.push(img);
      }
      product.setImages(images);

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