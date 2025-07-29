import { Injectable } from '@nestjs/common';
import OrderItemCreateDTO from './dto/OrderItemCreate.dto';
import OrderItemUpdateDTO from './dto/OrderItemUpdate.dto';

@Injectable()
export class OrderItemService {
  createOrderItem(dto: OrderItemCreateDTO) {
    return 'This action adds a new orderItem';
  }

  findAllOrderItems() {
    return `This action returns all orderItem`;
  }

  findOrderItemById(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  updateOrderItem(id: number, dto: OrderItemUpdateDTO) {
    return `This action updates a #${id} orderItem`;
  }

  removeOrderItem(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
