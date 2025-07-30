import { Module } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusController } from './order-status.controller';
import OrderStatusRepository from './order-status.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusEntity } from './order-status.entity';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderStatusEntity]),
    OrderModule
  ],
  controllers: [OrderStatusController],
  providers: [OrderStatusService, OrderStatusRepository],
})
export class OrderStatusModule {}
