import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { IsEmailUnique } from "../validations/isEmailUnique.validator";

export default class UserUpdateDTO {
   @IsNotEmpty()
   @IsUUID()
   id: string;

   @IsOptional()
   @IsString()
   @MinLength(3)
   @MaxLength(150)
   @IsNotEmpty()
   name: string;

   @IsOptional()
   @IsString()
   @MinLength(2)
   @MaxLength(150)
   @IsNotEmpty()
   lastName: string;

   @IsOptional()
   @IsEmail()
   @IsEmailUnique()
   email: string;
   
   @IsOptional()
   @MinLength(8)
   password: string;

   @IsOptional()
   @IsDateString()
   birthDate: Date;
}