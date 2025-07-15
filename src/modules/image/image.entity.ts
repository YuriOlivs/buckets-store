import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import TeamEntity from "../team/team.entity";
import ProductEntity from "../product/product.entity";

@Entity({ name: 'images' })
export default class ImageEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ name: 'url', length: 255,nullable: false })
   url: string;

   @Column({ name: 'desc', length: 255, nullable: false })
   description: string;

   @ManyToOne(() => ProductEntity, product => product.images)
   product: ProductEntity | null

   @ManyToOne(() => TeamEntity, team => team.logo)
   team: TeamEntity | null

   constructor(
      url: string, 
      description: string,
      product?: ProductEntity,
      team?: TeamEntity
   ) {
      this.url = url;
      this.description = description;
      this.product = product || null;
      this.team = team || null;
   }
}