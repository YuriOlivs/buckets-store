import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderEntity } from "../order/entities/order.entity";
import { OrderStatusCodeEnum } from "./enum/order-status-code.enum";
import { OrderStatusTextEnum } from "./enum/order-status-text.enum";

@Entity({ name: "order_status" })
export class OrderStatusEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @OneToOne(() => OrderEntity, (order) => order.orderStatus)
   @JoinColumn({ name: 'order_id' })
   order: OrderEntity;

   @Column({ name: "status_code", type: 'enum', enum: OrderStatusCodeEnum, nullable: false })
   statusCode: OrderStatusCodeEnum;

   @Column({ name: "status_text", type: 'enum', enum: OrderStatusTextEnum, nullable: false })
   statusText: OrderStatusTextEnum;

   @Column({ name: "status_date", nullable: false })
   statusDate: Date;

   @CreateDateColumn({ name: "created_at" })
   createdAt: Date;

   @UpdateDateColumn({ name: "updated_at" })
   updatedAt: Date;

   @DeleteDateColumn({ name: "deleted_at" })
   deletedAt: Date;

   constructor(
      statusCode: OrderStatusCodeEnum,
      statusText: OrderStatusTextEnum,
      statusDate: Date,
      order?: OrderEntity,
   ) {
      this.statusCode = statusCode;
      this.statusText = statusText;
      this.statusDate = statusDate;
      if (order) this.order = order;
   }
}
