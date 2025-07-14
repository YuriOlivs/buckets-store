import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'teams' })
export default class TeamEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ name: 'name', length: 100, nullable: false })
   name: string;

   @Column({ name: 'city', length: 100, nullable: false })
   city: string;

   @CreateDateColumn({ name: 'created_at' })
   createdAt: Date;

   @UpdateDateColumn({ name: 'updated_at' })
   updatedAt: Date;

   @DeleteDateColumn({ name: 'deleted_at' })
   deletedAt: Date;

   constructor(id: string, name: string, city: string) {
      this.id = id;
      this.name = name;
      this.city = city;
   }

   get getId() { return this.id; }
   get getName() { return this.name; }
   get getCity() { return this.city; }
   get getCreatedAt() { return this.createdAt; }
   get getUpdatedAt() { return this.updatedAt; }
   get getDeletedAt() { return this.deletedAt; }

   setName(name: string) { this.name = name; }
   setCity(city: string) { this.city = city; }
}