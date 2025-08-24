import { IsNotEmpty, IsUUID } from "class-validator";

export class OrderCreateDTO {
   @IsUUID()
   @IsNotEmpty()
   cart: string;

   @IsUUID()
   @IsNotEmpty()
   address: string;
}
