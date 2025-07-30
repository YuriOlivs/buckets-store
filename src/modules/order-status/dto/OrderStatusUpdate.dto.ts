import { IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { StatusCodeEnum } from "../enum/statusCode.enum";
import { StatusTextEnum } from "../enum/statusText.enum";

export class OrderStatusUpdateDTO { 
      @IsEnum(StatusCodeEnum)
      @IsNotEmpty()
      statusCode: StatusCodeEnum;
   
      @IsNotEmpty()
      @IsEnum(StatusTextEnum)
      statusText: StatusTextEnum;
   
      @IsUUID()
      order: string;
}
