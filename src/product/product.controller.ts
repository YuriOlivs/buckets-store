import { Body, Controller, Get, Post } from "@nestjs/common";
import ProductRepository from "./product.repository";
import CreateProductDTO from "./dto/CreateProductDTO";

@Controller('/products')
export default class ProductController {
   constructor(private repository: ProductRepository) {}

   @Post()
   createProduct(@Body() body: CreateProductDTO) {
      this.repository.saveProduct(body)
      return { message: 'Product created' }
   }

   @Get()
   getAllProducts() {
      return this.repository.getAllProducts()
   }
}