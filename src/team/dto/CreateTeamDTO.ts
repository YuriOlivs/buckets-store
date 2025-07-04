import { IsNotEmpty, IsString } from "class-validator";

export default class CreateTeamDTO {
   @IsString()
   @IsNotEmpty()
   name: string;

   @IsString()
   @IsNotEmpty()
   city: string;
}