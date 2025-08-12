import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import ProductCreateDTO from "./dto/product-create.dto";
import ProductEntity from "./product.entity";
import ProductMapper from "./dto/product.mapper";
import ProductService from "./product.service";
import { STRINGS } from "src/common/strings/global.strings";
import ImageEntity from "../image/image.entity";
import ProductFilterDTO from "./dto/product-filter.dto";
import ProductUpdateDTO from "./dto/product-update.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { EmptyListToNoContentInterceptor } from "src/common/interceptor/empty-list-to-no-content.interceptor";
import { AuthGuard } from "../auth/auth.guard";

@Controller('/products')
export default class ProductController {
   constructor(private service: ProductService) { }

   @Post()
   @UseGuards(AuthGuard)
   async createProduct(@Body() body: ProductCreateDTO) {
      const productCreated = await this.service.createProduct(body);
      return { 
         message: STRINGS.entityCreated('Product'), 
         payload: ProductMapper.toDTO(productCreated)
      }
   }

   @Get()
   @UseInterceptors(CacheInterceptor, EmptyListToNoContentInterceptor)
   async getAllProducts(@Query() filters: ProductFilterDTO) {
      return await this.service.getAllProducts(filters);
   }

   @Get('/:id')
   @UseInterceptors(CacheInterceptor)
   async getProductById(@Param('id') id: string) {
      const product = await this.service.getProductById(id);
      return ProductMapper.toDTO(product);
   }

   @Get('/team/:teamId')
   @UseInterceptors(CacheInterceptor, EmptyListToNoContentInterceptor)
   async getProductByTeam(@Param('teamId') teamId: string) {
      const products = await this.service.getProductByTeam(teamId);
      return products.map(ProductMapper.toDTO);
   }

   @Put('/:id')
   @UseGuards(AuthGuard)
   async updateProduct(@Param('id') id: string, @Body() body: ProductUpdateDTO) {
      const product = await this.service.updateProduct(id, body);
      return { 
         message: STRINGS.entityUpdated('Product'), 
         payload: ProductMapper.toDTO(product)
      };
   }

   @Delete()
   @UseGuards(AuthGuard)
   async deleteProduct(@Param('id') id: string) {
      await this.service.deleteProduct(id);
      return { 
         message: STRINGS.entityDeleted('Product'), 
         payload: {} 
   };
   }
}