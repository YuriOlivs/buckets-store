import { Type } from "class-transformer";
import { IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import CreateImageDTO from "src/modules/image/dto/CreateImage.dto";

export default class TeamCreateDTO {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @IsNotEmpty()
   city: string;

   @ValidateNested()
   @IsNotEmptyObject()
   @Type(() => CreateImageDTO)
   logo: CreateImageDTO;
}