import { Injectable } from "@nestjs/common";
import ProductCreateDTO from "./dto/ProductCreateDTO";
import ProductEntity from "./product.entity";

@Injectable()
export default class ProductRepository {
   private products: ProductEntity[] = [];

   saveProduct(product: ProductEntity): ProductEntity {
      this.products.push(product);
      return product;
   }

   getAllProducts(): ProductEntity[] {
      return this.products;
   }
}