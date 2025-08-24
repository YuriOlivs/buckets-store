import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { CouponRepository } from './coupon.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponEntity } from './coupon.entity';

@Module({
  controllers: [CouponController],
  providers: [CouponService, CouponRepository],
  imports: [
    TypeOrmModule.forFeature([CouponEntity]),
  ],
  exports: [CouponService]
})
export class CouponModule {}
