import { Body, Controller, Get, Post } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import ProductRepository from "./product.repository";
import ProductCreateDTO from "./dto/ProductCreate.dto";
import ProductEntity from "./product.entity";
import ProductMapper from "./product.mapper";

@Controller('/products')
export default class ProductController {
   constructor(private repository: ProductRepository) { }

   @Post()
   createProduct(@Body() body: ProductCreateDTO) {
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

      const productCreated = this.repository.saveProduct(product);
      return { message: 'Product created', payload: ProductMapper.toDTO(productCreated) }
   }

   @Get()
   getAllProducts() {
      const productEntities = this.repository.getAllProducts();
      return productEntities.map(ProductMapper.toDTO);
   }
}