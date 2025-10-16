import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import CartRepository from './cart.repository';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import CartEntity from './entities/cart.entity';
import { CartItemEntity } from './entities/cart-item.entity';
import { ProductModule } from '../product/product.module';
import { CouponModule } from '../coupon/coupon.module';
import { StockModule } from '../stock/stock.module';

@Module({
  controllers: [CartController],
  providers: [CartService, CartRepository],
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    UserModule,
    ProductModule,
    CouponModule,
    StockModule
  ],
  exports: [CartService]
})
export class CartModule { }
