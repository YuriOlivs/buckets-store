import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import ImageDTO from "./ImageDTO";
import { Type } from "class-transformer";

export default class CreateProductDTO {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @MaxLength(800)
   description: string;

   @IsString()
   @IsNotEmpty()
   category: string;

   @IsString()
   subcategory: string;

   @IsNumber()
   @IsPositive()
   price: number;

   @IsString()
   @IsUUID()
   team: string;

   @IsArray()
   @ValidateNested()
   @Type(() => ImageDTO)
   images: ImageDTO[];
}