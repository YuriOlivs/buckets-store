import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CouponTargetEnum } from "./enum/CouponTarget.enum";

@Entity({ name: "coupons" })
export class Coupon {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column({ name: "code", length: 6, nullable: false })
   code: string;

   @Column({ name: "discount", nullable: false })
   discount: number;

   @Column({ name: "start_date", nullable: false })
   startDate: Date;

   @Column({ name: "end_date", nullable: false })
   endDate: Date;

   @Column({ name: "target_type", enum: CouponTargetEnum, nullable: true })
   targetType: CouponTargetEnum;

   @Column({ name: "target_value", nullable: true })
   targetValue: string | null;

   @Column({ name: "is_percentage", nullable: false })
   isPercentage: boolean;

   @Column({ name: "max_uses", nullable: false })
   maxUses: number;

   @Column({ name: "current_uses", nullable: false })
   currentUses: number;

   @CreateDateColumn({ name: "created_at" })
   createdAt: Date;

   @UpdateDateColumn({ name: "updated_at" })
   updatedAt: Date;

   @DeleteDateColumn({ name: "deleted_at" })
   deletedAt: Date;

   constructor(
      code: string,
      discount: number,
      startDate: Date,
      endDate: Date,
      targetType: CouponTargetEnum,
      targetValue: string | null,
      isPercentage: boolean,
      maxUses: number,
      currentUses: number,
      id?: string
   ) {
      this.code = code;
      this.discount = discount;
      this.startDate = startDate;
      this.endDate = endDate;
      this.targetType = targetType;
      this.targetValue = targetValue;
      this.isPercentage = isPercentage;   
      this.maxUses = maxUses;
      this.currentUses = currentUses;
      if(id) this.id = id;
   }
}
