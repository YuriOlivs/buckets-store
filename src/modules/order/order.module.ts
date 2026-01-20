import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from '../address/address.module';
import { CartModule } from '../cart/cart.module';
import { UserModule } from '../user/user.module';
import { OrderEntity } from './entities/order.entity';
import OrderController from './order.controller';
import OrderRepository from './order.repository';
import OrderService from './order.service';
import { StockModule } from '../stock/stock.module';
import { CouponModule } from '../coupon/coupon.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    UserModule,
    AddressModule,
    CartModule,
    StockModule,
    CouponModule
  ],
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule { }
