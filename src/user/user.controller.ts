import { Body, Controller, Get, Post } from '@nestjs/common';
import UserRepository from './user.repository';
import UserCreateDTO from './dto/UserCreateDTO';

@Controller('/users')
export default class UserController {
   constructor(private repository: UserRepository) { }

   @Post()
   createUser(@Body() body: UserCreateDTO) {
      this.repository.saveUser(body);
      return { message: 'User created' };
   }

   @Get()
   getUsers() {
      return this.repository.getAllUsers();
   }
}
