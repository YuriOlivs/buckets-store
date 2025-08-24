import { Injectable } from '@nestjs/common';
import { UpdateCouponDto } from './dto/coupon-update.dto';
import { CreateCouponDto } from './dto/coupon-create.dto';

@Injectable()
export class CouponService {
  create(dto: CreateCouponDto) {
    return 'This action adds a new coupon';
  }

  findAll() {
    return `This action returns all coupon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coupon`;
  }

  update(id: number, dto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
