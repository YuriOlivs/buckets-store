import { IsNumber, IsPositive, IsUUID } from "class-validator";

export default class OrderItemCreateDTO {
   @IsUUID()
   product: string;
   
   @IsNumber()
   @IsPositive()
   quantity: number;
}
