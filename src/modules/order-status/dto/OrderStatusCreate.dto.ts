import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { StatusCodeEnum } from "../enum/statusCode.enum";
import { StatusTextEnum } from "../enum/statusText.enum";

export class OrderStatusCreateDTO {
   @IsEnum(StatusCodeEnum)
   @IsNotEmpty()
   @IsOptional()
   statusCode: StatusCodeEnum;

   @IsNotEmpty()
   @IsEnum(StatusTextEnum)
   @IsOptional()
   statusText: StatusTextEnum;

   @IsUUID()
   order: string;
}
