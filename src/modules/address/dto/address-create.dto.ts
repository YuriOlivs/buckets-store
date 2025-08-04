import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsUUID, Max, ValidateNested } from "class-validator";

export class AddressCreateDTO {
   @IsString()
   @IsNotEmpty()
   @Max(255)
   street: string;

   @IsString()
   @IsNotEmpty()
   @Max(20)
   number: string;

   @IsString()
   @IsNotEmpty()
   @Max(100)
   city: string;

   @IsString()
   @IsNotEmpty()
   @Max(100)
   state: string;

   @IsString()
   @IsNotEmpty()
   @Max(100)
   @IsOptional()
   complement: string;

   @IsString()
   @IsNotEmpty()
   @Max(100)
   neighborhood: string;

   @IsString()
   @IsNotEmpty()
   @Max(20)
   postalCode: string;

   @IsString()
   @IsNotEmpty()
   @Max(100)
   country: string;

   @IsUUID()
   user: string;

   @ValidateNested({ each: true })
   @Type(() => AddressCreateDTO)
   address: AddressCreateDTO;
}
