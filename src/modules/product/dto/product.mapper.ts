import ProductResponseDTO from "./product-response.dto";
import ProductEntity from "../product.entity";
import ImageMapper from "src/modules/image/dto/image.mapper.dto";
import ImageResponseDTO from "src/modules/image/dto/image-response.dto";
import { StockStatusEnum } from "../enum/stock-status.enum";

export default class ProductMapper {
   static toDTO(product: ProductEntity): ProductResponseDTO {
      let stockStatus: StockStatusEnum;
      let images: ImageResponseDTO[] = [];
      if (product.images) {
         images = product.images.map(image => ImageMapper.toDTO(image));
      }

      if (product.quantityAvailable == 0) {
         stockStatus = StockStatusEnum.OUT_OF_STOCK;
      } else if (product.quantityAvailable < 10) {
         stockStatus = StockStatusEnum.LOW_STOCK;
      } else {
         stockStatus = StockStatusEnum.IN_STOCK;
      }

      return new ProductResponseDTO(
         product.id,
         product.name,
         product.description,
         product.category,
         product.subcategory,
         product.quantityAvailable,
         stockStatus,
         product.price,
         product.team,
         images
      );
   }
}