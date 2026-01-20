import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponCreateDTO } from './dto/coupon-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CouponUpdateDTO } from './dto/coupon-update.dto';

@UseGuards(AuthGuard, AdminGuard)
@Controller('coupons')
@UseInterceptors(ClassSerializerInterceptor)
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post()
  create(@Body() createCouponDto: CouponCreateDTO) {
    return this.couponService.create(createCouponDto);
  }

  @Get()
  findAll() {
    return this.couponService.findAll();
  }

  @Get('/:code')
  findOne(@Param('code') code: string) {
    return this.couponService.findByCode(code);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCouponDto: CouponUpdateDTO) {
    return this.couponService.update(id, updateCouponDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.deactivate(id);
  }
}
