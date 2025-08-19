import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsUUID, Min } from "class-validator";

export class CartItemCreateDTO {
   @IsUUID()
   product: string;

   @IsNumber()
   @IsPositive()
   @Min(1)
   @Type (() => Number)
   quantity: number;
}
