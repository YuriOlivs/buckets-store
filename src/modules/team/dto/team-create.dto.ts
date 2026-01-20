import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import ImageCreateDTO from "src/modules/image/dto/image-create.dto";

export default class TeamCreateDTO {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   name: string;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   city: string;

   @ApiProperty()
   @ValidateNested()
   @IsNotEmptyObject()
   @Type(() => ImageCreateDTO)
   logo: ImageCreateDTO;
}