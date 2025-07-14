import ProductResponseDTO from "./ProductResponse.dto";
import ProductEntity from "../product.entity";
import ImageMapper from "src/modules/image/dto/image.mapper.dto";

export default class ProductMapper {
   static toDTO(product: ProductEntity): ProductResponseDTO {
      const images = product.getImages.map(image => ImageMapper.toDTO(image));
      return new ProductResponseDTO(
         product.getId,
         product.getName,
         product.getDescription,
         product.getCategory,
         product.getSubcategory,
         product.getPrice,
         product.getTeamId,
         images
      )
   }
}