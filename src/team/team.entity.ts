import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'teams' })
export default class TeamEntity {
   @PrimaryGeneratedColumn('uuid')
   private id: string;

   @Column({ name: 'name', length: 100, nullable: false })
   private name: string;

   @Column({ name: 'city', length: 100, nullable: false })
   private city: string;

   constructor(id: string, name: string, city: string) {
      this.id = id;
      this.name = name;
      this.city = city;
   }

   get getId() { return this.id; }
   get getName() { return this.name; }
   get getCity() { return this.city; }

   setId(id: string) { this.id = id; }
   setName(name: string) { this.name = name; }
   setCity(city: string) { this.city = city; }
}