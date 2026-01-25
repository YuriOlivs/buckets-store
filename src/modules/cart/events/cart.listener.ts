import { Injectable } from "@nestjs/common";
import CartRepository from "../cart.repository";
import { UserCreatedEvent } from "src/modules/user/events/user-created.event";
import { OnEvent } from "@nestjs/event-emitter";
import CartEntity from "../entities/cart.entity";

@Injectable()
export class CartListener {
   constructor(
      private readonly cartRepository: CartRepository
   ) {}

   @OnEvent('user.created')
   async handleUserCreated(event: UserCreatedEvent) {
      const cart = new CartEntity(event.user);
      await this.cartRepository.save(cart);
   }
}