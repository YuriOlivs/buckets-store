import { Module } from "@nestjs/common";
import UserController from "./user.controller";
import UserRepository from "./user.repository";
import { IsEmailUniqueValidator } from "./validations/isEmailUnique.validator";
import UserService from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "./user.entity";

@Module({
   imports: [TypeOrmModule.forFeature([UserEntity])],
   controllers: [UserController],
   providers: [
      UserService,
      UserRepository, 
      IsEmailUniqueValidator
   ]
})
export class UserModule {}