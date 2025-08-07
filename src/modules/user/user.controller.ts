import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import UserCreateDTO from './dto/user-create.dto';
import UserEntity from './user.entity';
import UserMapper from './dto/user.mapper';
import UserService from './user.service';
import { STRINGS } from 'src/common/strings/global.strings';
import { HashPasswordPipe } from 'src/common/pipe/hash-password.pipe';

@Controller('/users')
export default class UserController {
   constructor(private service: UserService) { }

   @Post()
   async createUser(
      @Body() { password, ...body }: UserCreateDTO,
      @Body('password', HashPasswordPipe) hashedPassword: string
   ) {
      const userCreated = await this.service.createUser({ 
         ...body, 
         password: hashedPassword 
      });

      return { 
         message: STRINGS.entityCreated('User'), 
         payload: UserMapper.toDTO(userCreated) 
      };
   }

   @Get()
   async getUsers() {
      const userEntities = await this.service.getAllUsers();
      return userEntities.map(UserMapper.toDTO);
   }

   @Put('/:id')
   async updateUser(@Param('id') id: string, @Body() body: Partial<UserEntity>) {
      const updatedUser = await this.service.updateUser(id, body);
      return { 
         message: STRINGS.entityUpdated('User'), 
         payload: UserMapper.toDTO(updatedUser) 
      };
   }

   @Delete('/:id')
   async removeUser(@Param('id') id: string) {
      await this.service.deleteUser(id);
      return { 
         message: STRINGS.entityDeleted('User'), 
         payload: {} 
      };
   }
}
