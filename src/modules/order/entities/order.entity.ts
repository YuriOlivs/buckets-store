import { CouponEntity } from "src/modules/coupon/coupon.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AddressEntity } from "../../address/address.entity";
import { OrderStatusEntity } from "../../order-status/order-status.entity";
import UserEntity from "../../user/user.entity";
import { OrderItemEntity } from "./order-item.entity";

@Entity({ name: 'orders' })
export class OrderEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ name: 'total_value', type: 'numeric', precision: 10, scale: 2, nullable: false })
   totalValue: number;

   @Column({ name: 'raw_value', type: 'numeric', precision: 10, scale: 2, nullable: false, default: 0.00 })
   rawValue: number;

   @Column({ name: 'discount_value', type: 'numeric', precision: 10, scale: 2, nullable: false, default: 0.00 })
   discountValue: number;

   @ManyToOne(() => UserEntity, user => user.orders)
   @JoinColumn({ name: 'user_id' })
   user: UserEntity;

   @ManyToOne(() => AddressEntity, address => address.orders, { eager: true })
   address: AddressEntity;

   @ManyToOne(() => CouponEntity, coupon => coupon.orders, { nullable: true })
   @JoinColumn({ name: "coupon_id" })
   coupon: CouponEntity | null;

   @OneToOne(
      () => OrderStatusEntity, orderStatus => orderStatus.order,
      { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', eager: true }
   )
   orderStatus: OrderStatusEntity;

   @OneToMany(
      () => OrderItemEntity, orderItem => orderItem.order,
      { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' }
   )
   orderItems: OrderItemEntity[];

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at' })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;

   constructor(
      totalValue: number,
      rawValue: number,
      discountValue: number,
      user: UserEntity,
      orderItems: OrderItemEntity[],
      orderStatus: OrderStatusEntity,
      address: AddressEntity,
      coupon?: CouponEntity | null
   ) {
      this.totalValue = totalValue;
      this.rawValue = rawValue;
      this.discountValue = discountValue;
      this.user = user;
      this.orderItems = orderItems;
      this.orderStatus = orderStatus;
      this.address = address;
      if (coupon) this.coupon = coupon;
   }
}
