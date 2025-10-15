import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from "class-validator";

export class StockUpdateDTO { 
   @IsUUID()
   @IsNotEmpty()
   productId: string;

   @IsNumber()
   @IsPositive()
   quantity: number;
}
