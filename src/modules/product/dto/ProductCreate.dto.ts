import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import ImageCreateDTO from "../../image/dto/ImageCreate.dto";
import { Type } from "class-transformer";

export default class ProductCreateDTO {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @MaxLength(800)
   description: string;

   @IsString()
   @IsNotEmpty()
   category: string;

   @IsOptional()
   @IsString()
   @IsNotEmpty()
   subcategory: string;

   @IsNumber()
   @IsPositive()
   price: number;

   @IsNumber()
   @IsPositive()
   quantityAvailable: number;

   @IsString()
   @IsUUID()
   team: string;

   @IsArray()
   @ValidateNested()
   @Type(() => ImageCreateDTO)
   images: ImageCreateDTO[];
}