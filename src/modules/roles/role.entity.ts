import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "../user/user.entity";

@Entity({ name: "roles" })
export class RoleEntity {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column({ name: "name", length: 10, nullable: false })
   name: string;

   @Column({ name: "description", length: 255, nullable: true })
   description?: string;

   @OneToMany(() => UserEntity, (user) => user.role, { onDelete: "CASCADE" })
   users: UserEntity[];

   constructor(name: string, description?: string) {
      this.name = name;
      this.description = description;
   }
}
