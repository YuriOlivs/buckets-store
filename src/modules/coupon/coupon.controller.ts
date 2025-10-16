import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponCreateDTO } from './dto/coupon-create.dto';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';

@UseGuards(AuthGuard, AdminGuard)
@Controller('coupons')
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponService.findById(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCouponDto: CouponUpdateDTO) {
  //   return this.couponService.update(+id, updateCouponDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponService.deactivate(id);
  }
}
