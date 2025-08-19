import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ProductEntity from "../../product/product.entity";
import { OrderEntity } from "./order.entity";

@Entity({ name: 'order_items' })
export class OrderItemEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => OrderEntity, order => order.orderItems)
   @JoinColumn({ name: 'order_id' })
   order: OrderEntity;

   @ManyToOne(() => ProductEntity, product => product.orderItems)
   @JoinColumn({ name: 'product_id' })
   product: ProductEntity;

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
      product: ProductEntity,
      quantity: number,
      salePrice: number,
      order?: OrderEntity
   ) {
      this.product = product;
      this.quantity = quantity;
      this.salePrice = salePrice;
      if (order) this.order = order;
   }
}
