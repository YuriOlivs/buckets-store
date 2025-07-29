import { Module } from '@nestjs/common';
import OrderService from './order.service';
import OrderController from './order.controller';
import OrderRepository from './order.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
