import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import ProductEntity from "./product.entity";
import ProductRepository from "./product.repository";
import TeamService from "../team/team.service";
import ImageService from "../image/image.service";
import ImageEntity from "../image/image.entity";
import ProductCreateDTO from "./dto/ProductCreate.dto";
import ProductFilterDTO from "./dto/ProductFilter.dto";
import ProductUpdateDTO from "./dto/ProductUpdate.dto";
@Injectable()
export default class ProductService {
   constructor(
      private repo: ProductRepository,
      private teamService: TeamService,
      private imgService: ImageService
   ) { }

   async getAllProducts(filters: ProductFilterDTO): Promise<ProductEntity[]> {
      const products = await this.repo.getAll(filters);

      products.map(async product => {
         const images = await this.imgService.getImagesByProduct(product.id);
         if (images) product.setImages(images);
      });

      return products;
   }

   async getProductById(id: string): Promise<ProductEntity> {
      const productFound = await this.repo.getById(id);
      if (!productFound) throw new NotFoundException('Product not found')

      const images = await this.imgService.getImagesByProduct(productFound.id);
      if (images) productFound.setImages(images);

      return productFound;
   }

   async getProductByTeam(id: string): Promise<ProductEntity[]> {
      const teamFound = await this.teamService.getTeamById(id);
      if (!teamFound) throw new NotFoundException('Team not found');

      const products = await this.repo.getByTeam(id);
      products.map(async product => {
         const images = await this.imgService.getImagesByProduct(product.id);
         if (images) product.setImages(images);
      });

      return products;
   }

   async createProduct(dto: ProductCreateDTO): Promise<ProductEntity> {
      const images: ImageEntity[] = [];
      const productImages = dto.images.map(image => new ImageEntity(image.url, image.desc));

      const teamFound = await this.teamService.getTeamById(dto.team);
      if (!teamFound) throw new NotFoundException('Team not found');

      const product = new ProductEntity(
         dto.name,
         dto.description,
         dto.category,
         dto.subcategory,
         dto.price,
         teamFound,
         productImages,
         dto.quantityAvailable,
      );

      for (const image of product.getImages) {
         let img: ImageEntity;
         const urlExists = await this.imgService.getImageByUrl(image.url);
         if (urlExists) {
            if (image.description != urlExists.description) urlExists.description = image.description;
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

   async buyProduct(product: ProductEntity, quantity: number): Promise<boolean> {
      if(product.quantityAvailable <= 0) {
         return false;
      }

      product.quantityAvailable = product.quantityAvailable - quantity;
      await this.repo.save(product);
      return true;
   }

   async updateProduct(id: string, productData: ProductUpdateDTO): Promise<ProductEntity> {
      const productFound = await this.repo.getById(id);
      if (!productFound) throw new NotFoundException('Product not found');

      if (productData.name) productFound.setName(productData.name);
      if (productData.description) productFound.setDescription(productData.description);
      if (productData.category) productFound.setCategory(productData.category);
      if (productData.subcategory) productFound.setSubcategory(productData.subcategory);
      if (productData.price) productFound.setPrice(productData.price);

      if (productData.team) {
         const teamFound = await this.teamService.getTeamById(productData.team);
         if (!teamFound) throw new NotFoundException('Team not found');

         productFound.setTeam(teamFound);
      }

      return await this.repo.save(productFound);
   }

   async deleteProduct(id: string) {
      const productFound = await this.repo.getById(id);
      if (!productFound) throw new NotFoundException('Product not found');

      return await this.repo.remove(id);
   }
}