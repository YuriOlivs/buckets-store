import ProductResponseDTO from "./ProductResponse.dto";
import ProductEntity from "../product.entity";

export default class ProductMapper {
   static toDTO(product: ProductEntity): ProductResponseDTO {
      return new ProductResponseDTO(
         product.getId,
         product.getName,
         product.getDescription,
         product.getCategory,
         product.getSubcategory,
         product.getPrice,
         product.getTeamId,
         product.getImages
      )
   }
}