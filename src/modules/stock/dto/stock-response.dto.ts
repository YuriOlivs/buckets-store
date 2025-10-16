import ProductResponseDTO from "src/modules/product/dto/product-response.dto";

export default class StockResponseDTO {
   constructor(
      readonly product: ProductResponseDTO,
      readonly quantity: number,
      readonly status: string
   ) {}
}