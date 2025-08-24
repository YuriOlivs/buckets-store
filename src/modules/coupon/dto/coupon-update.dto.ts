import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponDto } from './coupon-create.dto';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {}
