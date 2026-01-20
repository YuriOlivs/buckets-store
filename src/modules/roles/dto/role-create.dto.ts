import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { IsRoleNameUnique } from "../validations/is-role-name-unique.validator";

export class RoleCreateDTO {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   @MaxLength(10)
   @IsRoleNameUnique()
   name: string;

   @ApiProperty()
   @IsOptional()
   @IsString()
   @MaxLength(255)
   description?: string;
}
