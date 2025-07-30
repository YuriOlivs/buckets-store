import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderEntity } from "../order/order.entity";
import { StatusTextEnum } from "./enum/statusText.enum";
import { StatusCodeEnum } from "./enum/statusCode.enum";

@Entity({ name: "order_status" })
export class OrderStatusEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @OneToOne(() => OrderEntity, (order) => order.orderStatus)
   order: OrderEntity;

   @Column({ name: "status_code", type: 'enum', enum: StatusCodeEnum, nullable: false })
   statusCode: StatusCodeEnum;

   @Column({ name: "status_text", type: 'enum', enum: StatusTextEnum, nullable: false })
   statusText: StatusTextEnum;

   @Column({ name: "status_date", nullable: false })
   statusDate: Date;

   @CreateDateColumn({ name: "created_at" })
   createdAt: Date;

   @UpdateDateColumn({ name: "updated_at" })
   updatedAt: Date;

   @DeleteDateColumn({ name: "deleted_at" })
   deletedAt: Date;

   constructor(
      statusCode: StatusCodeEnum,
      statusText: StatusTextEnum,
      statusDate: Date,
      order?: OrderEntity,
   ) {
      this.statusCode = statusCode;
      this.statusText = statusText;
      this.statusDate = statusDate;
      if (order) this.order = order;
   }
}
