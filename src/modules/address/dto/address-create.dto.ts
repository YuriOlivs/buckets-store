import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddressCreateDTO {

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   @MaxLength(255)
   street: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   @MaxLength(20)
   number: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   city: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   state: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   @IsOptional()
   complement: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   neighborhood: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   @MaxLength(20)
   postalCode: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   @MaxLength(100)
   country: string;

   @ApiProperty()
   @IsUUID()
   user: string;
}
