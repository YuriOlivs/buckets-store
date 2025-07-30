import { Injectable } from '@nestjs/common';
import OrderItemCreateDTO from './dto/OrderItemCreate.dto';
import OrderItemUpdateDTO from './dto/OrderItemUpdate.dto';
import OrderItemRepository from './order-item.repository';
import { OrderItemEntity } from './order-item.entity';
import ProductOrderItemDTO from '../product/dto/ProductOrderItem.dto';

@Injectable()
export class OrderItemService {
  constructor(
    private repo: OrderItemRepository
  ) {}

  createOrderItem(dtos: ProductOrderItemDTO[], orderId: string) {
    const orderItems = dtos.map(dto => new OrderItemEntity(orderId, dto.id, dto.quantity, dto.price));
    return this.repo.save(orderItems);
  }

  findAllOrderItems() {
    return this.repo.findAll();
  }

  findOrderItemById(id: string) {
    return this.repo.findById(id);
  }

  updateOrderItem(id: string, dto: OrderItemUpdateDTO) {
    return `This action updates a #${id} orderItem`;
  }

  removeOrderItem(id: string) {
    return `This action removes a #${id} orderItem`;
  }
}
