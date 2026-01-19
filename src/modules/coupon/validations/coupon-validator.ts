import CartEntity from "src/modules/cart/entities/cart.entity";
import { CouponEntity } from "../coupon.entity";
import { CouponTargetEnum } from "../enum/CouponTarget.enum";
import { STRINGS } from "src/common/strings/global.strings";
import { BadRequestException } from "@nestjs/common";

const couponValidator: Record<string, (coupon: CouponEntity, cart: CartEntity) => boolean> = {

   [CouponTargetEnum.GLOBAL]: (coupon, cart) => {
      if (coupon.currentUses >= coupon.maxUses) return false;
      return true;
   },

   [CouponTargetEnum.CATEGORY]: (coupon, cart) => {
      for (const item of cart.cartItems) {
         if (item.product.category !== coupon.targetValue) return false;
      }
      return true;
   },

   [CouponTargetEnum.USER]: (coupon, cart) => {
      if (cart.user.id !== coupon.targetValue) return false;
      return true;
   },

};

export default couponValidator;