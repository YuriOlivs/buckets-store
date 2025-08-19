import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import CartEntity from "./entities/cart.entity";
import { Repository } from "typeorm";
import { CartItemEntity } from "./entities/cart-item.entity";

@Injectable()
export default class CartRepository {
   constructor(
      @InjectRepository(CartEntity)
      private readonly cartRepository: Repository<CartEntity>,
      @InjectRepository(CartItemEntity)
      private readonly cartItemRepository: Repository<CartItemEntity>,
   ) { }

   async findByUser(userId: string): Promise<CartEntity | null> {
      return await this.cartRepository.findOne({
         where: { user: { id: userId } },
         relations: ['cartItems', 'cartItems.product'],
      });
   }

   async findById(id: string): Promise<CartEntity | null> {
      return await this.cartRepository.findOne({
         where: { id },
         relations: ['cartItems', 'cartItems.product'],
      });
   }

   async save(cart: CartEntity): Promise<CartEntity> {
      return await this.cartRepository.save(cart);
   }

   async saveItem(item: CartItemEntity): Promise<CartItemEntity> {
      return await this.cartItemRepository.save(item);
   }

   async remove(cart: CartEntity): Promise<CartEntity> {
      return await this.cartRepository.remove(cart);
   }

   async clearCart(id: string): Promise<void> {
      const cart = await this.findById(id);
      if (!cart) throw new Error('Cart not found');
      await this.cartRepository.save(cart);
      await this.cartItemRepository.delete({ cart: { id } });
   }
}