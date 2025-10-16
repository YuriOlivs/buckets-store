import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { IsRoleNameUnique } from "../validations/is-role-name-unique.validator";

export class RoleCreateDTO {
   @IsNotEmpty()
   @IsString()
   @MaxLength(10)
   @IsRoleNameUnique()
   name: string;

   @IsOptional()
   @IsString()
   @MaxLength(255)
   description?: string;
}
