import { Injectable } from "@nestjs/common";
import UserEntity from "./user.entity";

@Injectable() //um provider em NestJS é qualquer classe que tenha esse decorator
export default class UserRepository {
   private users: UserEntity[] = [];

   saveUser(user: UserEntity): UserEntity {
      this.users.push(user);
      return user;
   }

   getAllUsers(): UserEntity[] {
      return this.users;
   }

   updateUser(id: string, userData: Partial<UserEntity>): UserEntity {
      const user = this.users.find(user => user.getId === id);

      if(!user) throw new Error('User not found');
      if(userData.getEmail) {
         if(this.getUserByEmail(userData.getEmail)) {
            throw new Error('Email already in use');
         }
      }

      if (userData.getName) user.setName(userData.getName);
      if (userData.getLastName) user.setLastName(userData.getLastName);
      if (userData.getEmail) user.setEmail(userData.getEmail);
      if (userData.getPassword) user.setPassword(userData.getPassword);
      if (userData.getBirthDate) user.setBirthDate(userData.getBirthDate);

      return user;
   }

   getUserByEmail(email: string): boolean {
      const user = this.users.find(user => user.getEmail === email);
      if (user) return true;
      return false;
   }

   removeUser(id: string) {
      const user = this.users.find(user => user.getId === id);
      if(!user) throw new Error('User not found');
      this.users = this.users.filter(user => user.getId !== id);
      return user;
   }
}