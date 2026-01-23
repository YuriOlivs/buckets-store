import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class StockUpdateDTO { 
   @ApiProperty()
   @IsUUID()
   @IsNotEmpty()
   productId: string;

   @ApiProperty()
   @IsNumber()
   @IsPositive()
   quantity: number;
}
