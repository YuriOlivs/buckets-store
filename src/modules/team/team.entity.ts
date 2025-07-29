import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import ImageEntity from "../image/image.entity";
import ProductEntity from "../product/product.entity";

@Entity({ name: 'teams' })
export default class TeamEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ name: 'name', length: 100, nullable: false })
   name: string;

   @Column({ name: 'city', length: 100, nullable: false })
   city: string;

   @OneToOne(() => ImageEntity, image => image.team)
   logo: ImageEntity;

   @OneToMany(() => ProductEntity, product => product.team)
   products: ProductEntity[];

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at' })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;

   constructor(name: string, city: string, logo: ImageEntity) {
      this.name = name;
      this.city = city;
      this.logo = logo;
   }

   get getId() { return this.id; }
   get getName() { return this.name; }
   get getCity() { return this.city; }
   get getLogo() { return this.logo; }
   get getCreatedAt() { return this.createdAt; }
   get getUpdatedAt() { return this.updatedAt; }
   get getDeletedAt() { return this.deletedAt; }

   setName(name: string) { this.name = name; }
   setCity(city: string) { this.city = city; }
   setLogo(logo: ImageEntity) { this.logo = logo; }
}