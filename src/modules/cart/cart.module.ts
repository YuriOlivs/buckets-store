import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CouponModule } from '../coupon/coupon.module';
import { ProductModule } from '../product/product.module';
import { StockModule } from '../stock/stock.module';
import { CartController } from './cart.controller';
import CartRepository from './cart.repository';
import { CartService } from './cart.service';
import { CartItemEntity } from './entities/cart-item.entity';
import CartEntity from './entities/cart.entity';
import { CartListener } from './events/cart.listener';

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    CartRepository,
    CartListener
  ],
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    ProductModule,
    CouponModule,
    StockModule
  ],
  exports: [CartService]
})
export class CartModule { }
