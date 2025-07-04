import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import UserRepository from './user.repository';
import UserCreateDTO from './dto/UserCreateDTO';
import UserEntity from './user.entity';
import UserMapper from './user.mapper';
import UserUpdateDTO from './dto/UserUpdateDTO';

@Controller('/users')
export default class UserController {
   constructor(private repository: UserRepository) { }

   @Post()
   createUser(@Body() body: UserCreateDTO) {    
      const user = new UserEntity(
         uuid(),
         body.name,
         body.lastName,
         body.email,
         body.password,
         body.birthDate
      );

      const userCreated = this.repository.saveUser(user);
      return { message: 'User created', payload: UserMapper.toDTO(userCreated) };
   }

   @Get()
   getUsers() {
      const userEntities = this.repository.getAllUsers();
      console.log(userEntities);
      const users = userEntities.map(UserMapper.toDTO);
      return users;
   }

   @Put('/:id')
   updateUser(@Param('id') id: string, @Body() body: UserUpdateDTO) {
      const updatedUser = this.repository.updateUser(id, body);
      return { message: 'User updated', payload: UserMapper.toDTO(updatedUser) };
   }
}
