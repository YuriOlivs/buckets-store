import { Body, Controller, Get, Post } from '@nestjs/common';
import UserRepository from './user.repository';
import CreateUserDTO from './dto/CreateUserDTO';

@Controller('/users')
export default class UserController {
   constructor(private repository: UserRepository) {}

   @Post()
   async createUser(@Body() body: CreateUserDTO) {
      await this.repository.saveUser(body);
      return { message: 'User created' };
   }

   @Get()
   async getUsers() {
      return await this.repository.getAllUsers();
   }
}
