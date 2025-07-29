import { Type } from "class-transformer";
import { IsArray, IsNumber, IsPositive, IsUUID, ValidateNested } from "class-validator";
import OrderItemCreateDTO from "src/modules/order-item/dto/OrderItemCreate.dto";

export class OrderCreateDTO {
   @IsUUID()
   user: string;

   @IsArray()
   @ValidateNested({ each: true })
   @Type(() => OrderItemCreateDTO)
   products: OrderItemCreateDTO[];
}
