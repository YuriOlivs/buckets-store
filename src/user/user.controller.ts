import { Body, Controller, Get, Post } from '@nestjs/common';
import UserRepository from './user.repository';
import CreateUserDTO from './dto/CreateUserDTO';

@Controller('/users')
export default class UserController {
   constructor(private repository: UserRepository) {}

   @Post()
   createUser(@Body() body: CreateUserDTO) {
      this.repository.saveUser(body);
      return { message: 'User created' };
   }

   @Get()
   getUsers() {
      return this.repository.getAllUsers();
   }
}
