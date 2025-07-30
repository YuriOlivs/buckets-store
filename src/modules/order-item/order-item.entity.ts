import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderEntity } from "../order/order.entity";
import ProductEntity from "../product/product.entity";

@Entity({ name: 'order_items' })
export class OrderItemEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => OrderEntity, order => order.orderItems)
   @JoinColumn({ name: 'order_id' })
   order: string;

   @ManyToOne(() => ProductEntity, product => product.orderItems)
   @JoinColumn({ name: 'product_id' })
   product: string;

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

   constructor(
      order: string,
      product: string,
      quantity: number,
      salePrice: number
   ) {
      this.order = order;
      this.product = product;
      this.quantity = quantity;
      this.salePrice = salePrice;
   }
}
