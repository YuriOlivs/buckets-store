import { IsNumber, IsPositive, IsUUID } from "class-validator";

export class CartItemCreateDTO {
   @IsUUID()
   product: string;

   @IsNumber()
   @IsPositive()
   quantity: number;
}
