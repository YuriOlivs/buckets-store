import { Injectable } from "@nestjs/common";
import CreateProductDTO from "./dto/CreateProductDTO";

@Injectable()
export default class ProductRepository {
   private products: CreateProductDTO[] = [];

   saveProduct(product: CreateProductDTO): CreateProductDTO {
      this.products.push(product);
      return product;
   }

   getAllProducts(): CreateProductDTO[] {
      return this.products;
   }
}