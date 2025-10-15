import ProductMapper from "src/modules/product/dto/product.mapper";
import { StockEntity } from "../stock.entity";
import StockResponseDTO from "./stock-response.dto";

export default class StockMapper {
   static toDTO(stock: StockEntity) {
      const product = ProductMapper.toDTO(stock.product);
      return new StockResponseDTO(
         product, 
         stock.quantity, 
         stock.stockStatus
      );
   }
}