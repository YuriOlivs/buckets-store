import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDTO {
   @ApiProperty()
   @IsEmail()
   email: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   password: string;
}
