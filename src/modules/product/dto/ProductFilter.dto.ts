import { IsEnum, IsOptional, IsPositive, IsString, IsUUID, Max, Min } from "class-validator";
import { ProductCategory } from "../enum/productCategory.enum";
import { ProductSubcategory } from "../enum/productSubcategory.enum";

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
   @IsPositive()
   @Min(0)
   minPrice?: number;

   @IsOptional()
   @IsPositive()
   @Max(5000)
   maxPrice?: number;
}