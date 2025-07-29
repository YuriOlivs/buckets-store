import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'order_items' })
export class OrderItem {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   orderId: string;

   productId: string;

   @Column({ name: 'quantity', type: 'int', nullable: false })
   quantity: number;

   @Column({ name: 'sale_price', type: 'numeric', precision: 10, scale: 2, nullable: false })
   salePrice: number;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at' })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;
}
