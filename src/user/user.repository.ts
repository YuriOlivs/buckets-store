import { Injectable } from "@nestjs/common";

@Injectable() //um provider em NestJS é qualquer classe que tenha esse decorator
export default class UserRepository {
   private users: any[] = [];

   async saveUser(user) {
      this.users.push(user);
      return user;
   }

   async getAllUsers() {
      return this.users;
   }  
}