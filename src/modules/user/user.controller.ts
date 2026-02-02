import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { HashPasswordPipe } from 'src/common/pipe/hash-password.pipe';
import { STRINGS } from 'src/common/strings/global.strings';
import { AuthGuard } from '../auth/auth.guard';
import UserCreateDTO from './dto/user-create.dto';
import UserUpdateDTO from './dto/user-update.dto';
import UserMapper from './dto/user.mapper';
import UserService from './user.service';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('/users')
export default class UserController {
   constructor(private service: UserService) { }

   @Post()
   async createUser(
      @Body() { password, ...body }: UserCreateDTO,
      @Body('password', HashPasswordPipe) hashedPassword: string
   ) {
      const userCreated = await this.service.create({
         ...body,
         password: hashedPassword
      });

      return {
         message: STRINGS.entityCreated('User'),
         payload: UserMapper.toDTO(userCreated)
      };
   }

   @UseGuards(AuthGuard, AdminGuard)
   @Get()
   async getUsers() {
      const userEntities = await this.service.findAll();
      return userEntities.map(UserMapper.toDTO);
   }

   @UseGuards(AuthGuard, AdminGuard)
   @Patch('/update-role/:user_id')
   async updateRole(
      @Param('user_id') userId: string, 
      @Body('role') role: string
   ) {
      const userUpdated = await this.service.updateRole(userId, role);
      return {
         message: STRINGS.entityUpdated('User'),
         payload: UserMapper.toDTO(userUpdated)
      };
   }

   @Put('/:id')
   @UseGuards(AuthGuard)
   async updateUser(
      @Param('id') id: string, 
      @Body() body: UserUpdateDTO
   ) {
      const updatedUser = await this.service.update(id, body);
      return {
         message: STRINGS.entityUpdated('User'),
         payload: UserMapper.toDTO(updatedUser)
      };
   }

   @Delete('/:id')
   @UseGuards(AuthGuard)
   async removeUser(@Param('id') id: string) {
      await this.service.delete(id);
      return {
         message: STRINGS.entityDeleted('User'),
         payload: {}
      };
   }
}
