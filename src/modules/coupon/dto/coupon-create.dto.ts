import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";
import { CouponTargetEnum } from "../enum/CouponTarget.enum";
import { IsNotPastDate } from "../validations/is-not-past-date.validation";

export class CouponCreateDTO {
   @IsString()
   @MinLength(6)
   @MaxLength(6)
   code: string;

   @IsNumber()
   @IsPositive()
   discount: number;

   @IsDate()
   @Type(() => Date)
   @IsNotPastDate()
   startDate: Date;

   @IsDate()
   @Type(() => Date)
   @IsNotPastDate()
   endDate: Date;

   @IsEnum(CouponTargetEnum)
   targetType: CouponTargetEnum;

   @IsString()
   @IsOptional()
   targetValue: string;

   @IsBoolean()
   isPercentage: boolean;

   @IsNumber()
   @IsPositive()
   @Min(1)
   maxUses: number;
}
