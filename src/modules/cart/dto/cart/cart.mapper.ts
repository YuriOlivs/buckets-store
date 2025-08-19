import ProductMapper from "src/modules/product/dto/product.mapper";
import { CartItemEntity } from "../../entities/cart-item.entity";
import CartEntity from "../../entities/cart.entity";
import { CartItemResponseDTO } from "../cart-item/cart-item-response.dto";
import { CartResponseDTO } from "./cart-response.dto";
export default class CartMapper {
   static toDTO(cart: CartEntity) {
      const items = cart.cartItems.map(item => CartMapper.itemToDTO(item));
      return new CartResponseDTO(cart.totalValue, items);
   }

   static itemToDTO(item: CartItemEntity) {
      const product = ProductMapper.toDTO(item.product);
      return new CartItemResponseDTO(
         item.id,
         product,
         item.quantity,
         item.salePrice
      );
   }
}