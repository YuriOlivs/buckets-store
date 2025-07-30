import { Injectable } from '@nestjs/common';
import { OrderStatusCreateDTO } from './dto/OrderStatusCreate.dto';
import { OrderStatusUpdateDTO } from './dto/OrderStatusUpdate.dto';

@Injectable()
export class OrderStatusService {
  createOrderStatus(OrderStatusCreateDTO: OrderStatusCreateDTO) {
    return 'This action adds a new orderStatus';
  }

  findAllOrderStatus() {
    return `This action returns all orderStatus`;
  }

  findOrderStatusById(id: number) {
    return `This action returns a #${id} orderStatus`;
  }

  updateOrderStatus(id: number, OrderStatusUpdateDTO: OrderStatusUpdateDTO) {
    return `This action updates a #${id} orderStatus`;
  }

  removeOrderStatus(id: number) {
    return `This action removes a #${id} orderStatus`;
  }
}
