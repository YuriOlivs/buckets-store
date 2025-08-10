import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, } from "class-validator";

export class AddressCreateDTO {
   @IsString()
   @IsNotEmpty()
   @MaxLength(255)
   street: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(20)
   number: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   city: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   state: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   @IsOptional()
   complement: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   neighborhood: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(20)
   postalCode: string;

   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   country: string;

   @IsUUID()
   user: string;
}
