import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import ProductCreateDTO from "./dto/product-create.dto";
import ProductEntity from "./product.entity";
import ProductMapper from "./dto/product.mapper";
import ProductService from "./product.service";
import { STRINGS } from "src/common/strings/global.strings";
import ImageEntity from "../image/image.entity";
import ProductFilterDTO from "./dto/product-filter.dto";
import ProductUpdateDTO from "./dto/product-update.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";

@Controller('/products')
export default class ProductController {
   constructor(private service: ProductService) { }

   @Post()
   async createProduct(@Body() body: ProductCreateDTO) {
      const productCreated = await this.service.createProduct(body);
      return { 
         message: STRINGS.entityCreated('Product'), 
         payload: ProductMapper.toDTO(productCreated)
      }
   }

   @Get()
   async getAllProducts(@Query() filters: ProductFilterDTO) {
      const productEntities = await this.service.getAllProducts(filters);
      return productEntities.map(ProductMapper.toDTO);
   }

   @Get('/:id')
   @UseInterceptors(CacheInterceptor)
   async getProductById(@Param('id') id: string) {
      const product = await this.service.getProductById(id);
      return ProductMapper.toDTO(product);
   }

   @Get('/team/:teamId')
   async getProductByTeam(@Param('teamId') teamId: string) {
      const products = await this.service.getProductByTeam(teamId);
      return products.map(ProductMapper.toDTO);
   }

   @Put('/:id')
   async updateProduct(@Param('id') id: string, @Body() body: ProductUpdateDTO) {
      const product = await this.service.updateProduct(id, body);
      return { 
         message: STRINGS.entityUpdated('Product'), 
         payload: ProductMapper.toDTO(product)
      };
   }

   @Delete()
   async deleteProduct(@Param('id') id: string) {
      await this.service.deleteProduct(id);
      return { 
         message: STRINGS.entityDeleted('Product'), 
         payload: {} 
   };
   }
}