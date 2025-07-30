import { Module } from '@nestjs/common';
import OrderService from './order.service';
import OrderController from './order.controller';
import OrderRepository from './order.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { OrderItemModule } from '../order-item/order-item.module';
import { OrderStatusModule } from '../order-status/order-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity]),
    ProductModule,
    UserModule,
    OrderItemModule,
    OrderStatusModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
