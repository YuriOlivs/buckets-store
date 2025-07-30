import { Injectable } from '@nestjs/common';
import { OrderStatusCreateDTO } from './dto/OrderStatusCreate.dto';
import { OrderStatusUpdateDTO } from './dto/OrderStatusUpdate.dto';
import OrderStatusRepository from './order-status.repository';
import { OrderStatusEntity } from './order-status.entity';

@Injectable()
export class OrderStatusService {
  constructor(private repo: OrderStatusRepository) {}

  createOrderStatus(dto: OrderStatusCreateDTO) {
    return 'This action adds a new orderStatus';
  }

  findAllOrderStatus() {
    return `This action returns all orderStatus`;
  }

  findOrderStatusById(id: number) {
    return `This action returns a #${id} orderStatus`;
  }

  updateOrderStatus(id: number, dto: OrderStatusUpdateDTO) {
    return `This action updates a #${id} orderStatus`;
  }

  removeOrderStatus(id: number) {
    return `This action removes a #${id} orderStatus`;
  }
}
