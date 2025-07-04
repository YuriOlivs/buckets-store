import { Body, Controller, Get, Post } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import UserRepository from './user.repository';
import UserCreateDTO from './dto/UserCreateDTO';
import UserEntity from './user.entity';
import UserMapper from './user.mapper';

@Controller('/users')
export default class UserController {
   constructor(private repository: UserRepository) { }

   @Post()
   createUser(@Body() body: UserCreateDTO) {
      const id = uuid();
      console.log(id);
      
      const user = new UserEntity(
         uuid(),
         body.name,
         body.lastName,
         body.email,
         body.password,
         body.birthDate
      );

      this.repository.saveUser(user);
      return { message: 'User created', payload: user.getId };
   }

   @Get()
   getUsers() {
      const userEntities = this.repository.getAllUsers();
      console.log(userEntities);
      const users = userEntities.map(UserMapper.toDTO);
      return users;
   }
}
