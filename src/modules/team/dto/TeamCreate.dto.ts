import { IsNotEmpty, IsString } from "class-validator";

export default class TeamCreateDTO {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @IsNotEmpty()
   city: string;
}