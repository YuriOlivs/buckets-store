import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";
import { CouponTargetEnum } from "../enum/CouponTarget.enum";
import { IsNotPastDate } from "../validations/is-not-past-date.validation";

export class CouponCreateDTO {
   @ApiProperty()
   @IsString()
   @MinLength(6)
   @MaxLength(6)
   code: string;

   @ApiProperty()
   @IsNumber()
   @IsPositive()
   discount: number;

   @ApiProperty()
   @IsDate()
   @Type(() => Date)
   @IsNotPastDate()
   startDate: Date;

   @ApiProperty()
   @IsDate()
   @Type(() => Date)
   @IsNotPastDate()
   endDate: Date;

   @ApiProperty()
   @IsEnum(CouponTargetEnum)
   targetType: CouponTargetEnum;

   @ApiProperty()
   @IsString()
   @IsOptional()
   targetValue: string;

   @ApiProperty()
   @IsBoolean()
   isPercentage: boolean;

   @ApiProperty()
   @IsNumber()
   @IsPositive()
   @Min(1)
   maxUses: number;
}
