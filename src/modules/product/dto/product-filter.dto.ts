import { IsEnum, IsInt, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Max, Min } from "class-validator";
import { ProductCategory } from "../enum/product-category.enum";
import { ProductSubcategory } from "../enum/product-subcategory.enum";
import { Type } from "class-transformer";

export default class ProductFilterDTO {
   @IsOptional()
   @IsString()
   name: string;

   @IsOptional()
   @IsEnum(ProductCategory)
   category?: ProductCategory;

   @IsOptional()
   @IsEnum(ProductSubcategory)
   subcategory?: ProductSubcategory;

   @IsOptional()
   @IsUUID()
   team?: string;

   @IsOptional()
   @Type(() => Number)   // <- garante que será convertido para number
   @IsNumber()
   @Min(0)
   minPrice?: number;

   @IsOptional()
   @Type(() => Number)   // <- mesma coisa aqui
   @IsNumber()
   @Min(0)
   maxPrice?: number;

   @IsOptional()
   @IsInt()
   @Min(1)
   @Max(50)
   limit?: number;

   @IsOptional()
   @IsInt()
   @Min(1)
   page?: number;
} 