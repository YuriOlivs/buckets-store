import { IsString, IsUrl } from "class-validator";

export default class CreateImageDTO {
   @IsUrl()
   url: string;

   @IsString()
   desc: string;
}