import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ProductEntity from "../../product/product.entity";
import CartEntity from "./cart.entity";

@Entity({ name: 'cart_items' })
export class CartItemEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ManyToOne(() => CartEntity, cart => cart.cartItems)
   @JoinColumn({ name: 'cart_id' })
   cart: CartEntity;

   @ManyToOne(() => ProductEntity, product => product.cartItems)
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
      cart?: CartEntity
   ) {
      this.product = product;
      this.quantity = quantity;
      this.salePrice = salePrice;
      if (cart) this.cart = cart;
   }
}
