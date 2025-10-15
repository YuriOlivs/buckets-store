import { CartItemResponseDTO } from "../cart-item/cart-item-response.dto";

export class CartResponseDTO {
   constructor(
      private readonly id: string,
      private readonly totalValue: number,
      private readonly discountValue: number,
      private readonly rawValue: number,
      private readonly coupon: string | null,
      private readonly items: CartItemResponseDTO[]
   ) {}
}