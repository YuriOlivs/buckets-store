import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export default class CreateUserDTO {
   @IsString()
   @MinLength(3)
   @IsNotEmpty()
   name: string;

   @IsString()
   @MinLength(2)
   @IsNotEmpty()
   lastName: string;

   @IsEmail()
   email: string;

   @MinLength(8)
   password: string;
   
   @IsDateString()
   birthDate: Date;
}