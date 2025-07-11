import { Column, Entity } from "typeorm";

@Entity({ name: 'product_images' })
export default class ImageEntity {
   @Column({ name: 'url', nullable: false })
   url: string;

   @Column({ name: 'desc', length: 100, nullable: false })
   desc: string;
}