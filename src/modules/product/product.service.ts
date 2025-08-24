import { Injectable, NotFoundException } from "@nestjs/common";
import PagedResponseDTO from "src/common/dto/paged-response.dto";
import { STRINGS } from "src/common/strings/global.strings";
import ImageEntity from "../image/image.entity";
import ImageService from "../image/image.service";
import TeamService from "../team/team.service";
import ProductCreateDTO from "./dto/product-create.dto";
import ProductFilterDTO from "./dto/product-filter.dto";
import ProductResponseDTO from "./dto/product-response.dto";
import ProductUpdateDTO from "./dto/product-update.dto";
import ProductMapper from "./dto/product.mapper";
import ProductEntity from "./product.entity";
import ProductRepository from "./product.repository";

@Injectable()
export default class ProductService {
   constructor(
      private repo: ProductRepository,
      private teamService: TeamService,
      private imgService: ImageService
   ) { }

   async findAll(filters: ProductFilterDTO): Promise<PagedResponseDTO<ProductResponseDTO>> {
      const [products, total] = await this.repo.getAll(filters);

      for (const product of products) {
         const images = await this.imgService.findByProduct(product.id);
         if (images) product.images = images;
      }

      const page = filters.page ?? 1;
      const limit = filters.limit ?? 50;

      return new PagedResponseDTO(
         products.map(ProductMapper.toDTO),
         total,
         page,
         limit
      );
   }

   async findById(id: string): Promise<ProductEntity> {
      const productFound = await this.findById(id);

      const images = await this.imgService.findByProduct(productFound.id);
      if (images) productFound.images = images;

      return productFound;
   }

   async findByTeam(id: string): Promise<ProductEntity[]> {
      await this.teamService.findById(id);
      const products = await this.repo.findByTeam(id);

      for (const product of products) {
         const images = await this.imgService.findByProduct(product.id);
         if (images) product.images = images;
      }

      return products;
   }

   async create(dto: ProductCreateDTO): Promise<ProductEntity> {
      const images: ImageEntity[] = [];
      const productImages = dto.images.map(image => new ImageEntity(image.url, image.desc));
      const teamFound = await this.teamService.findById(dto.team);

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

      for (const image of product.images) {
         let img: ImageEntity;
         const urlExists = await this.imgService.findByUrl(image.url);
         if (urlExists) {
            if (image.description !== urlExists.description) {
               urlExists.description = image.description;
            }
            img = urlExists;
         } else {
            img = await this.imgService.create(image) as ImageEntity;
         }

         images.push(img);
      }

      product.images = images;

      return await this.repo.save(product);
   }

   async buy(product: ProductEntity, quantity: number): Promise<boolean> {
      if (product.quantityAvailable <= 0) {
         return false;
      }

      product.quantityAvailable -= quantity;
      await this.repo.save(product);
      return true;
   }

   async update(id: string, productData: ProductUpdateDTO): Promise<ProductEntity> {
      const productFound = await this.findById(id);

      const { team, ...rest } = productData;
      Object.assign(productFound, rest);

      if (team) {
         const teamFound = await this.teamService.findById(team);
         if (!teamFound) throw new NotFoundException(STRINGS.notFound('Team'));

         productFound.team = teamFound;
      }

      return await this.repo.save(productFound);
   }

   async delete(id: string) {
      const productFound = await this.findById(id);
      return await this.repo.remove(productFound);
   }
}

