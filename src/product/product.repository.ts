import { Injectable } from "@nestjs/common";

@Injectable()
export default class ProductRepository {
   private products: any[] = [];

   async saveProduct(product) {
      this.products.push(product);
      return product;
   }

   async getAllProducts() {
      return this.products;
   }
}