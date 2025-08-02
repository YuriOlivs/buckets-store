import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { OrderStatusCodeEnum } from "../enum/order-status-code.enum";
import { OrderStatusTextEnum } from "../enum/order-status-text.enum";

export class OrderStatusCreateDTO {
   @IsEnum(OrderStatusCodeEnum)
   @IsNotEmpty()
   @IsOptional()
   statusCode: OrderStatusCodeEnum;

   @IsNotEmpty()
   @IsEnum(OrderStatusTextEnum)
   @IsOptional()
   statusText: OrderStatusTextEnum;

   @IsUUID()
   order: string;
}
