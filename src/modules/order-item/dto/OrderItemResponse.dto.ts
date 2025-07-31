import ProductResponseDTO from "src/modules/product/dto/ProductResponse.dto";

export default class OrderItemResponseDTO {
   constructor(
      readonly quantity: number,
      readonly product: ProductResponseDTO
   ) {}
}