import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import OrderItemRepository from './order-item.repository';

@Module({
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepository],
})
export class OrderItemModule {}
