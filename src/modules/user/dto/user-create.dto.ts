import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { IsEmailUnique } from "../validations/is-email-unique.validator";
import { ApiProperty } from "@nestjs/swagger";

export default class UserCreateDTO {
   @ApiProperty()
   @IsString()
   @MinLength(3)
   @MaxLength(150)
   @IsNotEmpty()
   name: string;

   @ApiProperty()
   @IsString()
   @MinLength(2)
   @MaxLength(150)
   @IsNotEmpty()
   lastName: string;

   @ApiProperty()
   @IsEmail()
   @IsEmailUnique()
   email: string;

   @ApiProperty()
   @IsString()
   @MinLength(8)
   @MaxLength(30)
   @Matches(/[a-z]/, { message: 'password must contain at least one lowercase letter' })
   @Matches(/[A-Z]/, { message: 'password must contain at least one uppercase letter' })
   @Matches(/\d/, { message: 'password must contain at least one number' })
   @Matches(/[!@#$%^&*()_\-+=<>?\/]/, { message: 'password must contain at least one special character' })
   password: string;

   @ApiProperty()
   @IsDateString()
   birthDate: Date;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   @MaxLength(10)
   @IsOptional()
   role?: string;
}