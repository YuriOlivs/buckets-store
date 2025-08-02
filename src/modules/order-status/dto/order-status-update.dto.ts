import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { OrderStatusCodeEnum } from "../enum/order-status-code.enum";
import { OrderStatusTextEnum } from "../enum/order-status-text.enum";

export class OrderStatusUpdateDTO {
      @IsEnum(OrderStatusCodeEnum)
      @IsNotEmpty()
      statusCode: OrderStatusCodeEnum;

      @IsNotEmpty()
      @IsEnum(OrderStatusTextEnum)
      statusText: OrderStatusTextEnum;

      @IsUUID()
      order: string;
}
