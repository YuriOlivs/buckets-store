import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import OrderItemRepository from './order-item.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './order-item.entity';
import { ProductModule } from '../product/product.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItemEntity]),
    ProductModule,
    OrderModule
  ],
  exports: [OrderItemService],
  controllers: [OrderItemController],
  providers: [OrderItemService, OrderItemRepository],
})
export class OrderItemModule {}
