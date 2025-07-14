import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import UserCreateDTO from './dto/UserCreate.dto';
import UserEntity from './user.entity';
import UserMapper from './dto/user.mapper';
import UserService from './user.service';
import { STRINGS } from 'src/common/strings/global.strings';

@Controller('/users')
export default class UserController {
   constructor(private service: UserService) { }

   @Post()
   async createUser(@Body() body: UserCreateDTO) {
      const user = new UserEntity(
         uuid(),
         body.name,
         body.lastName,
         body.email,
         body.password,
         body.birthDate
      );

      const userCreated = await this.service.createUser(user);
      return { message: STRINGS.entityCreated('User'), payload: UserMapper.toDTO(userCreated) };
   }

   @Get()
   async getUsers() {
      const userEntities = await this.service.getAllUsers();
      return userEntities.map(UserMapper.toDTO);
   }

   @Put('/:id')
   async updateUser(@Param('id') id: string, @Body() body: Partial<UserEntity>) {
      const updatedUser = await this.service.updateUser(id, body);
      return { message: STRINGS.entityUpdated('User'), payload: UserMapper.toDTO(updatedUser) };
   }

   @Delete('/:id')
   async removeUser(@Param('id') id: string) {
      await this.service.deleteUser(id);
      return { message: STRINGS.entityDeleted('User'), payload: {} };
   }
}
