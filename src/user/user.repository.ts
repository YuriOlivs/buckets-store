import { Injectable } from "@nestjs/common";
import UserCreateDTO from "./dto/UserCreateDTO";
import UserEntity from "./user.entity";

@Injectable() //um provider em NestJS é qualquer classe que tenha esse decorator
export default class UserRepository {
   private users: UserEntity[] = [];

   saveUser(user: UserEntity) {
      this.users.push(user);
   }

   getAllUsers(): UserEntity[] {
      return this.users;
   }

   getUserByEmail(email: string): boolean {
      const user = this.users.find(user => user.getEmail === email);
      if (user) return true;
      return false;
   }
}