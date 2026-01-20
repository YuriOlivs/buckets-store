import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import ImageCreateDTO from "src/modules/image/dto/image-create.dto";
import { Type } from "class-transformer";
import { ProductCategory } from "../enum/product-category.enum";
import { ProductSubcategory } from "../enum/product-subcategory.enum";

export default class ProductCreateDTO {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   name: string;

   @ApiProperty()
   @IsString()
   @MaxLength(800)
   description: string;

   @ApiProperty()
   @IsEnum(ProductCategory)
   category: ProductCategory;

   @ApiProperty()
   @IsOptional()
   @IsEnum(ProductSubcategory)
   subcategory: ProductSubcategory;

   @ApiProperty()
   @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
   @IsPositive()
   price: number;

   @ApiProperty()
   @IsNumber({ maxDecimalPlaces: 0, allowNaN: false, allowInfinity: false })
   @IsPositive()
   quantityAvailable?: number;

   @ApiProperty()
   @IsString()
   @IsUUID()
   team: string;

   @ApiProperty()
   @IsArray()
   @ValidateNested()
   @Type(() => ImageCreateDTO)
   images: ImageCreateDTO[];
}