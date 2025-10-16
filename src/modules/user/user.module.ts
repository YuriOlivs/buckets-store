import { Module } from "@nestjs/common";
import UserController from "./user.controller";
import UserRepository from "./user.repository";
import { IsEmailUniqueValidator } from "./validations/is-email-unique.validator";
import UserService from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "./user.entity";
import { RolesModule } from "../roles/roles.module";

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