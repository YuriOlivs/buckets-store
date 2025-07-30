import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsUUID, ValidateNested } from "class-validator";
import ProductIdDTO from "src/modules/product/dto/ProductId.dto";
import ProductEntity from "src/modules/product/product.entity";

export default class OrderItemCreateDTO {
   @ValidateNested()
   @Type(() => ProductIdDTO)
   product: ProductIdDTO;

   @IsNumber()
   @IsPositive()
   quantity: number;

   @IsOptional()
   @IsUUID()
   order: string
}
