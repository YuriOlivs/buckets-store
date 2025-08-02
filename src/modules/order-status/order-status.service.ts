import { Injectable } from '@nestjs/common';
import { OrderStatusCreateDTO } from './dto/order-status-create.dto';
import { OrderStatusUpdateDTO } from './dto/order-status-update.dto';
import OrderStatusRepository from './order-status.repository';
import { OrderStatusEntity } from './order-status.entity';
import OrderService from '../order/order.service';
import { OrderStatusCodeEnum } from './enum/order-status-code.enum';
import { OrderStatusTextEnum } from './enum/order-status-text.enum';

@Injectable()
export class OrderStatusService {
  constructor(
    private repo: OrderStatusRepository,
    private orderService: OrderService
  ) { }

  async createOrderStatus(dto: OrderStatusCreateDTO): Promise<OrderStatusEntity> {
    const statusCode = dto.statusCode ?? OrderStatusCodeEnum.PENDING_PAYMENT;
    const statusText = dto.statusText ?? OrderStatusTextEnum.PENDING_PAYMENT;
    const order = await this.orderService.findOrderById(dto.order);
    if (!order) throw new Error('Order not found');

    const orderStatus = new OrderStatusEntity(
      statusCode,
      statusText,
      new Date(),
      order
    );

    return this.repo.save(orderStatus);
  }

  async findAllOrderStatus(): Promise<OrderStatusEntity[]> {
    return await this.repo.findAll();
  }

  async findOrderStatusById(id: string) {
    return await this.repo.findById(id);
  }

  async removeOrderStatus(id: string) {
    const orderStatusFound = await this.repo.findById(id);
    if (!orderStatusFound) throw new Error('OrderStatus not found');

    return this.repo.remove(orderStatusFound);
  }
}
