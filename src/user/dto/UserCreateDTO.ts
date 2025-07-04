import { IsDateString, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { IsEmailUnique } from "../validations/isEmailUnique.validator";

export default class UserCreateDTO {
   @IsString()
   @MinLength(3)
   @MaxLength(150)
   @IsNotEmpty()
   name: string;

   @IsString()
   @MinLength(2)
   @MaxLength(150)
   @IsNotEmpty()
   lastName: string;

   @IsEmail()
   @IsEmailUnique()
   email: string;

   @MinLength(8)
   password: string;
   
   @IsDateString()
   birthDate: Date;
}