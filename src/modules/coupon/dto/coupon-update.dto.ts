import { PartialType } from '@nestjs/mapped-types';
import { CouponCreateDTO } from './coupon-create.dto';

export class CouponUpdateDTO extends PartialType(CouponCreateDTO) { }
