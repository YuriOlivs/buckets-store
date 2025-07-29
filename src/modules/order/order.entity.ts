import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import UserEntity from "../user/user.entity";
import { OrderItemEntity } from "../order-item/order-item.entity";

@Entity({ name: 'orders' })
export class OrderEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ name: 'total_value', type: 'numeric', precision: 10, scale: 2, nullable: false })
   totalValue: number;

   @ManyToOne(() => UserEntity, user => user.orders)
   @JoinColumn({ name: 'user_id' })
   user: UserEntity;

   @OneToMany(() => OrderItemEntity, orderItem => orderItem.order)
   orderItems: OrderItemEntity[];

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at' })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;

   constructor(totalValue: number, user: UserEntity) {
      this.totalValue = totalValue;
      this.user = user;
   }
}
