import { Injectable } from '@nestjs/common';
import { CouponCreateDTO } from './dto/coupon-create.dto';
import { CouponUpdateDTO } from './dto/coupon-update.dto';

@Injectable()
export class CouponService {
  create(dto: CouponCreateDTO) {
    return 'This action adds a new coupon';
  }

  findAll() {
    return `This action returns all coupon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} coupon`;
  }

  update(id: number, dto: CouponUpdateDTO) {
    return `This action updates a #${id} coupon`;
  }

  remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
