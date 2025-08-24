import ProductResponseDTO from "src/modules/product/dto/product-response.dto";

export class CartItemResponseDTO {
   constructor(
      readonly id: string,
      readonly product: ProductResponseDTO,
      readonly quantity: number,
      readonly salePrice: number
   ) {}
}