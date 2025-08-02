import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ImageEntity from "../image/image.entity";
import { ProductCategory } from "./enum/product-category.enum";
import { ProductSubcategory } from "./enum/product-subcategory.enum";
import TeamEntity from "../team/team.entity";
import { OrderItemEntity } from "../order-item/order-item.entity";

@Entity({ name: 'products' })
export default class ProductEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ name: 'name', length: 100, nullable: false })
   name: string;

   @Column({ name: 'description', length: 800, nullable: false })
   description: string;

   @Column({ name: 'category', enum: ProductCategory, nullable: false })
   category: ProductCategory;

   @Column({ name: 'subcategory', enum: ProductSubcategory, nullable: true })
   subcategory: ProductSubcategory;

   @Column({ name: 'price', type: 'numeric', precision: 10, scale: 2, nullable: false })
   price: number;

   @Column({ name: 'quantity_available', type: 'int', nullable: false })
   quantityAvailable: number;

   @ManyToOne(() => TeamEntity, team => team.products)
   @JoinColumn({ name: 'team_id' })
   team: TeamEntity;

   @OneToMany(() => ImageEntity, image => image.product)
   images: ImageEntity[];

   @OneToMany(() => OrderItemEntity, orderItem => orderItem.product)
   orderItems: OrderItemEntity[];

   @CreateDateColumn({ name: 'created_at' })
   createdAt: string;

   @UpdateDateColumn({ name: 'updated_at' })
   updatedAt: string;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: string;

   constructor(
      name: string,
      description: string,
      category: ProductCategory,
      subcategory: ProductSubcategory,
      price: number,
      team: TeamEntity,
      images: ImageEntity[],
      quantityAvailable?: number
   ) {
      this.name = name;
      this.description = description;
      this.category = category;
      this.subcategory = subcategory;
      this.price = price;
      this.team = team;
      this.images = images;
      this.quantityAvailable = quantityAvailable || 0;
   }
}