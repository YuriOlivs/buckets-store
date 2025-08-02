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
         product.id,
         product.name,
         product.description,
         product.category,
         product.subcategory,
         product.quantityAvailable,
         product.price,
         product.team,
         images
      );
   }
}