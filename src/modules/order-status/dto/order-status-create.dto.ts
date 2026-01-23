import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { OrderStatusCodeEnum } from "../enum/order-status-code.enum";
import { OrderStatusTextEnum } from "../enum/order-status-text.enum";

export class OrderStatusCreateDTO {

   @ApiProperty()
   @IsEnum(OrderStatusCodeEnum)
   @IsNotEmpty()
   @IsOptional()
   statusCode: OrderStatusCodeEnum;

   @ApiProperty()
   @IsNotEmpty()
   @IsEnum(OrderStatusTextEnum)
   @IsOptional()
   statusText: OrderStatusTextEnum;

   @ApiProperty()
   @IsUUID()
   order: string;
}
