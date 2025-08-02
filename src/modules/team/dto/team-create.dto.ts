import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import ImageCreateDTO from "src/modules/image/dto/Image-create.dto";

export default class TeamCreateDTO {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @IsNotEmpty()
   city: string;

   @ValidateNested()
   @IsNotEmptyObject()
   @Type(() => ImageCreateDTO)
   logo: ImageCreateDTO;
}