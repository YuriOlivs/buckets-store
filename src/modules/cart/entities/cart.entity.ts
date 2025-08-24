import UserEntity from "src/modules/user/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartItemEntity } from "./cart-item.entity";

@Entity('carts')
export default class CartEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @OneToOne(() => UserEntity, user => user.cart)
   @JoinColumn({ name: 'user_id' })
   user: UserEntity;

   @OneToMany(
      () => CartItemEntity, cartItem => cartItem.cart,
      { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
   )
   cartItems: CartItemEntity[];

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at' })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;

   get totalValue(): number {
      return this.cartItems.reduce((total, item) => total + item.salePrice * item.quantity, 0);
   }

   constructor(
      user: UserEntity
   ) {
      this.user = user;
   }
}
