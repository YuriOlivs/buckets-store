import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import ImageCreateDTO from "../../image/dto/ImageCreate.dto";
import { Type } from "class-transformer";
import { ProductCategory } from "../enum/productCategory.enum";
import { ProductSubcategory } from "../enum/productSubcategory.enum";

export default class ProductCreateDTO {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @MaxLength(800)
   description: string;

   @IsEnum(ProductCategory)
   category: ProductCategory;

   @IsOptional()
   @IsEnum(ProductSubcategory)
   subcategory: ProductSubcategory;

   @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
   @IsPositive()
   price: number;

   @IsNumber({ maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false })
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