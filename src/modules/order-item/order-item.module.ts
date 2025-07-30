import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import OrderItemRepository from './order-item.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemEntity])],
  exports: [OrderItemService],
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepository],
})
export class OrderItemModule {}
