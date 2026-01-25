import ImageResponseDTO from "src/modules/image/dto/image-response.dto";
import ImageMapper from "src/modules/image/dto/image.mapper.dto";
import ProductEntity from "../product.entity";
import ProductResponseDTO from "./product-response.dto";

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
         product.price,
         product.team,
         images
      );
   }
}