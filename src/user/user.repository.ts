import { Injectable } from "@nestjs/common";
import CreateUserDTO from "./dto/CreateUserDTO";

@Injectable() //um provider em NestJS é qualquer classe que tenha esse decorator
export default class UserRepository {
   private users: CreateUserDTO[] = [];

   saveUser(user: CreateUserDTO): CreateUserDTO {
      this.users.push(user);
      return user;
   }

   getAllUsers(): CreateUserDTO[] {
      return this.users;
   }  

   getUserByEmail(email: string): boolean {
      const user = this.users.find(user => user.email === email);
      if(user) return true;
      return false;
   }
}