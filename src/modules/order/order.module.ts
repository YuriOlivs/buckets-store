import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from '../address/address.module';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import OrderController from './order.controller';
import { OrderEntity } from './order.entity';
import OrderRepository from './order.repository';
import OrderService from './order.service';
import { CartModule } from '../cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    ProductModule,
    UserModule,
    AddressModule,
    CartModule
  ],
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
