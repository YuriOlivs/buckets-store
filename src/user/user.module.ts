import { Module } from "@nestjs/common";
import UserController from "./user.controller";
import UserRepository from "./user.repository";
import { IsEmailUniqueValidator } from "./validations/isEmailUnique.validator";
import UserService from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
   imports: [TypeOrmModule.forFeature([UserRepository])],
   controllers: [UserController],
   providers: [
      UserService,
      UserRepository, 
      IsEmailUniqueValidator
   ]
})
export class UserModule {}