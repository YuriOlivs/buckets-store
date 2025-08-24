import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CouponCreateDTO } from './dto/coupon-create.dto';
import { CouponUpdateDTO } from './dto/coupon-update.dto';
import { CouponRepository } from './coupon.repository';
import { CouponEntity } from './coupon.entity';
import { STRINGS } from 'src/common/strings/global.strings';
import { CouponTargetEnum } from './enum/CouponTarget.enum';

@Injectable()
export class CouponService {
  constructor(private readonly repo: CouponRepository) {}

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
    if (!coupon) throw new NotFoundException(STRINGS.notFound('Coupon'));

    return coupon;
  }

  async findByTarget(type: CouponTargetEnum, value: string): Promise<CouponEntity[]> {
    const coupon = await this.repo.findByTarget(type, value);
    if (!coupon) throw new NotFoundException(STRINGS.notFound('Coupon'));

    return coupon
  }

  async findByActive(): Promise<CouponEntity[]> {
    const coupon = await this.repo.findByActive();
    if (!coupon) throw new NotFoundException(STRINGS.notFound('Coupon'));

    return coupon
  }

  async deactivate(id: string) {
    const coupon = await this.findById(id);
    return await this.repo.deactivate(coupon);
  }
}
