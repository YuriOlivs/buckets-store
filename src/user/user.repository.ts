import { Injectable } from "@nestjs/common";
import UserCreateDTO from "./dto/UserCreateDTO";

@Injectable() //um provider em NestJS é qualquer classe que tenha esse decorator
export default class UserRepository {
   private users: UserCreateDTO[] = [];

   saveUser(user: UserCreateDTO): UserCreateDTO {
      this.users.push(user);
      return user;
   }

   getAllUsers(): UserCreateDTO[] {
      return this.users;
   }

   getUserByEmail(email: string): boolean {
      const user = this.users.find(user => user.email === email);
      if (user) return true;
      return false;
   }
}