import { CartItemResponseDTO } from "../cart-item/cart-item-response.dto";

export class CartResponseDTO {
   constructor(
      private readonly id: string,
      private readonly totalValue: number,
      private readonly items: CartItemResponseDTO[]
   ) {}
}