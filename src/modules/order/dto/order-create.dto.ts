import { Type } from "class-transformer";
import { IsArray, IsNumber, IsPositive, IsString, IsUUID, ValidateNested } from "class-validator";
import { AddressCreateDTO } from "src/modules/address/dto/address-create.dto";
import OrderItemCreateDTO from "src/modules/order-item/dto/order-item-create.dto";

export class OrderCreateDTO {
   @IsUUID()
   user: string;

   @IsArray()
   @ValidateNested({ each: true })
   @Type(() => OrderItemCreateDTO)
   products: OrderItemCreateDTO[];

   @IsUUID()
   address: string;
}
