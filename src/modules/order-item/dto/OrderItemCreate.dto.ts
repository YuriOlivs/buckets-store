import { Type } from "class-transformer";
import { IsNumber, IsPositive, ValidateNested } from "class-validator";
import ProductOrderDTO from "src/modules/product/dto/ProductOrder.dto";
import ProductEntity from "src/modules/product/product.entity";

export default class OrderItemCreateDTO {
   @ValidateNested()
   @Type(() => ProductOrderDTO)
   product: ProductOrderDTO;
   
   @IsNumber()
   @IsPositive()
   quantity: number;
}
