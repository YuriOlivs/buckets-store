import { IsString, IsUrl } from "class-validator";

export default class ImageDTO {
   @IsUrl()
   url: string;

   @IsString()
   desc: string;
}