import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'product_images' })
export default class ImageEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ name: 'url', nullable: false })
   url: string;

   @Column({ name: 'desc', length: 100, nullable: false })
   desc: string;

   constructor(id: string, url: string, desc: string) {
      this.id = id;
      this.url = url;
      this.desc = desc;
   }
}