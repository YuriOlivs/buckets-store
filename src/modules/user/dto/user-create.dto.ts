import { IsDateString, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { IsEmailUnique } from "../validations/is-email-unique.validator";

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

   @IsString()
   @MinLength(8)
   @MaxLength(30)
   @Matches(/[a-z]/, { message: 'password must contain at least one lowercase letter' })
   @Matches(/[A-Z]/, { message: 'password must contain at least one uppercase letter' })
   @Matches(/\d/, { message: 'password must contain at least one number' })
   @Matches(/[!@#$%^&*()_\-+=<>?\/]/, { message: 'password must contain at least one special character' })
   password: string;

   @IsDateString()
   birthDate: Date;
}