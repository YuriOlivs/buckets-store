import ProductResponseDTO from "src/modules/product/dto/product-response.dto";

export default class OrderItemResponseDTO {
   constructor(
      readonly quantity: number,
      readonly product: ProductResponseDTO
   ) { }
}