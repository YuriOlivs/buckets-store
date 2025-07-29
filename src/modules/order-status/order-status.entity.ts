import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderEntity } from "../order/order.entity";

@Entity({ name: "order_status" })
export class OrderStatusEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @OneToOne(() => OrderEntity, (order) => order.orderStatus)
   order: OrderEntity;

   @Column({ name: "status_text", length: 255, nullable: false })
   statusText: string;

   @Column({ name: "status_date", nullable: false })
   statusDate: Date;

   @CreateDateColumn({ name: "created_at" })
   createdAt: Date;

   @UpdateDateColumn({ name: "updated_at" })
   updatedAt: Date;

   @DeleteDateColumn({ name: "deleted_at" })
   deletedAt: Date;
}
