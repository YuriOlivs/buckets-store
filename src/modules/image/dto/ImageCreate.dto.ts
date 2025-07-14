import { IsString, IsUrl } from "class-validator";

export default class ImageCreateDTO {
   @IsUrl()
   url: string;

   @IsString()
   desc: string;
}