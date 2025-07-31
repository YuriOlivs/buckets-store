import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "../user/user.entity";
import { OrderItemEntity } from "../order-item/order-item.entity";
import { OrderStatusEntity } from "../order-status/order-status.entity";

@Entity({ name: 'orders' })
export class OrderEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ name: 'total_value', type: 'numeric', precision: 10, scale: 2, nullable: false })
   totalValue: number;

   @ManyToOne(() => UserEntity, user => user.orders)
   @JoinColumn({ name: 'user_id' })
   user: UserEntity;

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
      user: UserEntity,
      orderItems: OrderItemEntity[],
      orderStatus: OrderStatusEntity
   ) {
      this.totalValue = totalValue;
      this.user = user;
      this.orderItems = orderItems;
      this.orderStatus = orderStatus;
   }
}
