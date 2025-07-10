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

   getProduct(id: string): ProductEntity {
      const product = this.products.find(product => product.getId === id);
      if(!product) throw new Error('Product not found');
      return product;
   }

   updateProduct(id: string, productData: Partial<ProductEntity>): ProductEntity {
      const product = this.products.find(product => product.getId === id);
      if(!product) throw new Error('Product not found');
      
      if(productData.getName) product.setName(productData.getName);
      if(productData.getDescription) product.setDescription(productData.getDescription);
      if(productData.getCategory) product.setCategory(productData.getCategory);
      if(productData.getSubcategory) product.setSubcategory(productData.getSubcategory);
      if(productData.getPrice) product.setPrice(productData.getPrice);
      if(productData.getTeam) product.setTeam(productData.getTeam);
      if(productData.getImages) product.setImages(productData.getImages);

      return product;
   }

   removeProduct(id: string) {
      const product = this.products.find(product => product.getId === id);
      if(!product) throw new Error('Product not found');
      this.products = this.products.filter(product => product.getId !== id);
   }
}