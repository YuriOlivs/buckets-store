import { IsNumber, IsOptional, IsPositive, IsUUID } from "class-validator";

export default class OrderItemCreateDTO {
   @IsUUID()
   product: string;

   @IsNumber()
   @IsPositive()
   quantity: number;

   @IsOptional()
   @IsUUID()
   order: string;
}
