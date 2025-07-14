import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import CreateImageDTO from "../../image/dto/CreateImage.dto";
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

   @IsString()
   @IsUUID()
   team: string;

   @IsArray()
   @ValidateNested()
   @Type(() => CreateImageDTO)
   images: CreateImageDTO[];
}