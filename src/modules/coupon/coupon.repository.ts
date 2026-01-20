import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import { CouponEntity } from "./coupon.entity";
import { CouponTargetEnum } from "./enum/CouponTarget.enum";

@Injectable()
export class CouponRepository {
   constructor(
      @InjectRepository(CouponEntity)
      private readonly repository: Repository<CouponEntity>
   ) {}

   async save(coupon: CouponEntity): Promise<CouponEntity> {
      return await this.repository.save(coupon);
   }

   async findAll(): Promise<CouponEntity[]> {
      return await this.repository.find();
   }

   async findByCode(code: string): Promise<CouponEntity | null> {
      return await this.repository.findOne({
         where: { 
            code: code
         }
      })
   }

   async findById(id: string): Promise<CouponEntity | null> {
      return await this.repository.findOne({ where: { id } });
   }

   async findByTarget(type: CouponTargetEnum, value: string): Promise<CouponEntity[]> {
      return await this.repository.find({ 
         where: { 
            targetType: type, 
            targetValue: value 
         } 
      });
   }

   async findActiveByCode(code: string): Promise<CouponEntity | null> {
      const now = new Date();
      return await this.repository.findOne({
         where: { 
            code: code,
            startDate: LessThanOrEqual(now),
            endDate: MoreThan(now)
         }
      })
   }

   async deactivate(coupon: CouponEntity): Promise<void> {
      await this.repository.softRemove(coupon);
   }
}