import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthDTO {
   @IsEmail()
   email: string;

   @IsString()
   @IsNotEmpty()
   password: string;
}
