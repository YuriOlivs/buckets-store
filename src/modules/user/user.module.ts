import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RolesModule } from "../roles/roles.module";
import UserEntity from "./user.entity";
import UserController from "./user.controller";
import UserRepository from "./user.repository";
import UserService from "./user.service";
import { IsEmailUniqueValidator } from "./validations/is-email-unique.validator";

@Module({
   imports: [
      TypeOrmModule.forFeature([UserEntity]),
      RolesModule
   ],
   exports: [UserService],
   controllers: [UserController],
   providers: [
      UserService,
      UserRepository,
      IsEmailUniqueValidator
   ]
})
export class UserModule { }