import { IsNotEmpty, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OrderCreateDTO {
   @ApiProperty()
   @IsUUID()
   @IsNotEmpty()
   cart: string;

   @ApiProperty()
   @IsUUID()
   @IsNotEmpty()
   address: string;
}
