import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { STRINGS } from 'src/common/strings/global.strings';
import CartEntity from '../cart/entities/cart.entity';
import { CouponEntity } from './coupon.entity';
import { CouponRepository } from './coupon.repository';
import { CouponCreateDTO } from './dto/coupon-create.dto';
import { CouponUpdateDTO } from './dto/coupon-update.dto';
import { CouponTargetEnum } from './enum/CouponTarget.enum';
import couponValidator from './validations/coupon-validator';

@Injectable()
export class CouponService {
  constructor(private readonly repo: CouponRepository) { }

  async create(dto: CouponCreateDTO): Promise<CouponEntity> {
    const existsActiveWithCode = await this.repo.findActiveByCode(dto.code);
    if (existsActiveWithCode) throw new BadRequestException(STRINGS.alreadyExists('Coupon'));

    const coupon = new CouponEntity(
      dto.code,
      dto.discount,
      dto.startDate,
      dto.endDate,
      dto.targetType,
      dto.targetType !== CouponTargetEnum.GLOBAL ? dto.targetValue : null,
      dto.isPercentage,
      dto.maxUses
    );

    return await this.repo.save(coupon);
  }

  async findAll(): Promise<CouponEntity[]> {
    return await this.repo.findAll();
  }

  async findById(id: string): Promise<CouponEntity> {
    const coupon = await this.repo.findById(id);
    if (!coupon) throw new NotFoundException(STRINGS.notFound('Coupon'));

    return coupon;
  }

  async findByCode(code: string): Promise<CouponEntity> {
    const coupon = await this.repo.findByCode(code);
    if (!coupon) throw new NotFoundException(STRINGS.invalidCoupon());

    return coupon;
  }

  async findByTarget(type: CouponTargetEnum, value: string): Promise<CouponEntity[]> {
    const coupon = await this.repo.findByTarget(type, value);
    if (!coupon) throw new NotFoundException(STRINGS.notFound('Coupon'));

    return coupon
  }

  async findActiveByCode(code: string): Promise<CouponEntity> {
    const coupon = await this.findByCode(code);
    if (!coupon.active) throw new BadRequestException(STRINGS.invalidCoupon());

    return coupon
  }

  async update(id: string, dto: CouponUpdateDTO): Promise<CouponEntity> {
    const coupon = await this.findById(id);
    if (coupon.active) throw new BadRequestException(STRINGS.cannotUpdate('Coupon', 'Active coupons cannot be updated.'));
    Object.assign(coupon, dto);

    return await this.repo.save(coupon);
  }

  async checkCouponValidity(coupon: CouponEntity, cart: CartEntity) {
    if (coupon.active === false) return false;

    const isValid = couponValidator[coupon.targetType](coupon, cart);
    return isValid;
  }

  async updateUsage(id: string): Promise<CouponEntity> {
    const coupon = await this.findById(id);
    coupon.currentUses += 1;
    return await this.repo.save(coupon);
  }

  async deactivate(id: string) {
    const coupon = await this.findById(id);
    return await this.repo.deactivate(coupon);
  }
}
