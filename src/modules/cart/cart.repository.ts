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
   ) {}

   async findByUser(userId: string): Promise<CartEntity | null> {
      return await this.cartRepository.findOne({
         where: { user: { id: userId } }
      });
   }

   async findById(id: string): Promise<CartEntity | null> {
      return await this.cartRepository.findOne({ where: { id } });
   }

   async save(cart: CartEntity): Promise<CartEntity> {
      return await this.cartRepository.save(cart);
   }

   async remove(cart: CartEntity): Promise<CartEntity> {
      return await this.cartRepository.remove(cart);
   }

   async clearCart(id: string): Promise<void> {
      await this.cartItemRepository.delete({ cart: { id } });
   }
}