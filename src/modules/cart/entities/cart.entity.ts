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

   @Column({ name: 'total_value', type: 'numeric', precision: 10, scale: 2, nullable: false })
   totalValue: number;

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

   constructor(
      user: UserEntity,
      totalValue?: number
   ) {
      this.user = user;
      this.totalValue = totalValue || 0;
   }
}
