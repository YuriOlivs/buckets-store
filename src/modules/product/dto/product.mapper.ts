import ProductResponseDTO from "./ProductResponse.dto";
import ProductEntity from "../product.entity";
import ImageMapper from "src/modules/image/dto/image.mapper.dto";
import ImageResponseDTO from "src/modules/image/dto/ImageResponse.dto";

export default class ProductMapper {
   static toDTO(product: ProductEntity): ProductResponseDTO {
      let images: ImageResponseDTO[] = [];
      if (product.images) {
         images = product.images.map(image => ImageMapper.toDTO(image));
      }

      return new ProductResponseDTO(
         product.getId,
         product.getName,
         product.getDescription,
         product.getCategory,
         product.getSubcategory,
         product.getQuantityAvailable,
         product.getPrice,
         product.getTeam,
         images
      )
   }
}