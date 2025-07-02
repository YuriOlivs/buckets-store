import { Body, Controller, Get, Post } from "@nestjs/common";
import ProductRepository from "./product.repository";
import CreateProductDTO from "./dto/CreateProductDTO";

@Controller('/products')
export default class ProductController {
   constructor(private repository: ProductRepository) {}

   @Post()
   async createProduct(@Body() body: CreateProductDTO) {
      await this.repository.saveProduct(body)
      return { message: 'Product created' }
   }

   @Get()
   async getAllProducts() {
      return await this.repository.getAllProducts()
   }
}