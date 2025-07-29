import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';
import OrderStatusRepository from './order-status.repository';

@Module({
  controllers: [OrderStatusController],
  providers: [OrderStatusService, OrderStatusRepository],
})
export class OrderStatusModule {}
