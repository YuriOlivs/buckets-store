import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ImageEntity from "./product-image.entity";

@Entity({ name: 'products' })
export default class ProductEntity {
   @PrimaryGeneratedColumn('uuid')
   private id: string;

   @Column({ name: 'name', length: 100, nullable: false })
   private name: string;

   @Column({ name: 'description', length: 800, nullable: false })
   private description: string;

   @Column({ name: 'category', length: 100, nullable: false })
   private category: string;

   @Column({ name: 'subcategory', length: 100, nullable: true })
   private subcategory: string;

   @Column({ name: 'price', nullable: false })
   private price: number;

   @Column({ name: 'team_id', nullable: false })
   private teamId: string;

   private images: ImageEntity[];

   @CreateDateColumn({ name: 'created_at' })
   private createdAt: string;

   @UpdateDateColumn({ name: 'updated_at' })
   private updatedAt: string;

   @DeleteDateColumn({ name: 'deleted_at' })
   private deletedAt: string;

   constructor(
      id: string,
      name: string,
      description: string,
      category: string,
      subcategory: string,
      price: number,
      teamId: string,
      images: ImageEntity[]
   ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.category = category;
      this.subcategory = subcategory;
      this.price = price;
      this.teamId = teamId;
      this.images = images;
   }

   get getId() { return this.id; }
   get getName() { return this.name; }
   get getDescription() { return this.description; }
   get getCategory() { return this.category; }
   get getSubcategory() { return this.subcategory; }
   get getPrice() { return this.price; }
   get getTeamId() { return this.teamId; }
   get getImages() { return this.images; }
   get getCreatedAt() { return this.createdAt; }
   get getUpdatedAt() { return this.updatedAt; }
   get getDeletedAt() { return this.deletedAt; }

   setId(id: string) { this.id = id; }
   setName(name: string) { this.name = name; }
   setDescription(description: string) { this.description = description; }
   setCategory(category: string) { this.category = category; }
   setSubcategory(subcategory: string) { this.subcategory = subcategory; }
   setPrice(price: number) { this.price = price; }
   setTeamId(teamId: string) { this.teamId = teamId; }
   setImages(images: ImageEntity[]) { this.images = images; }
}