import { CouponEntity } from "src/modules/coupon/coupon.entity";
import UserEntity from "src/modules/user/user.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

   @ManyToOne(() => CouponEntity, coupon => coupon.carts, { nullable: true })
   @JoinColumn({ name: "coupon_id" })
   coupon: CouponEntity | null;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at' })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;

   get rawValue(): number {
      const value = this.cartItems.reduce((total, item) => total + item.salePrice * item.quantity, 0);
      return Math.round(value * 100) / 100;
   }

   get discountValue(): number {
      if (!this.coupon) return 0;
      if (this.coupon.isPercentage) {
         let value = this.rawValue * this.coupon.discount / 100;
         return Math.round(value * 100) / 100;
      } else {
         return this.coupon.discount;
      }
   }

   get totalValue(): number {
      const value = this.rawValue - this.discountValue;
      return Math.round(value * 100) / 100;
   }

   constructor(
      user: UserEntity
   ) {
      this.user = user;
   }

   public addItem(item: CartItemEntity) {
      const exists = this.cartItems.find(cartItem => cartItem.product.id === item.product.id);
      if (exists) {
         exists.quantity += item.quantity;
      } else {
         this.cartItems.push(item);
      }
   }
}
