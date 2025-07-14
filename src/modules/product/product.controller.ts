import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import ProductCreateDTO from "./dto/ProductCreate.dto";
import ProductEntity from "./product.entity";
import ProductMapper from "./dto/product.mapper";
import ProductService from "./product.service";
import { STRINGS } from "src/common/strings/global.strings";

@Controller('/products')
export default class ProductController {
   constructor(private service: ProductService) { }

   @Post()
   async createProduct(@Body() body: ProductCreateDTO) {
      const images = body.images.map(image => {
         return {
            id: uuid(),
            url: image.url,
            desc: image.desc
         }
      })

      const product = new ProductEntity(
         uuid(),
         body.name,
         body.description,
         body.category,
         body.subcategory,
         body.price,
         body.team,
         images
      );

      const productCreated = await this.service.createProduct(product);
      return { message: STRINGS.entityCreated('Product'), payload: ProductMapper.toDTO(productCreated) }
   }

   @Get()
   async getAllProducts() {
      const productEntities = await this.service.getAllProducts();
      return { message: STRINGS.entityFound('Products'), payload: productEntities.map(ProductMapper.toDTO) };
   }

   @Get('/:id')
   async getProductById(@Param('id') id: string) {
      const product = await this.service.getProductById(id);
      return { message: STRINGS.entityFound('Product'), payload: ProductMapper.toDTO(product) };
   }

   @Put('/:id')
   async updateProduct(@Param('id') id: string, @Body() body: Partial<ProductEntity>) {
      const product = await this.service.updateProduct(id, body);
      return { message: STRINGS.entityUpdated('Product'), payload: ProductMapper.toDTO(product) };
   }

   @Delete()
   async deleteProduct(@Param('id') id: string) {
      await this.service.deleteProduct(id);
      return { message: STRINGS.entityDeleted('Product'), payload: {} };
   }
}