import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import ProductEntity from "../product/product.entity";
import { StockStatusEnum } from "./enum/stock-status.enum";

@Entity({ name: 'stock' })
export class StockEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @OneToOne(() => ProductEntity, product => product.stock, {
      onDelete: 'CASCADE'
   })
   @JoinColumn({ name: 'product_id' })
   product: ProductEntity;

   @Column({ name: 'quantity', type: 'int', nullable: false })
   quantity: number;

   get stockStatus(): string {
      if (this.quantity == 0) {
         return StockStatusEnum.OUT_OF_STOCK;
      } else if (this.quantity < 10) {
         return StockStatusEnum.LOW_STOCK;
      } else {
         return StockStatusEnum.IN_STOCK;
      }
   }

   get isAvailable(): boolean {
      return this.quantity > 0 ? true : false;
   }

   constructor(
      quantity: number,
      product?: ProductEntity
   ) {
      if(product) this.product = product;
      this.quantity = quantity;
   }
}
