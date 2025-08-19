import { Injectable } from '@nestjs/common';
import { STRINGS } from 'src/common/strings/global.strings';
import OrderService from '../order/order.service';
import { OrderStatusCreateDTO } from './dto/order-status-create.dto';
import { OrderStatusCodeEnum } from './enum/order-status-code.enum';
import { OrderStatusTextEnum } from './enum/order-status-text.enum';
import { OrderStatusEntity } from './order-status.entity';
import OrderStatusRepository from './order-status.repository';

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
    if (!order) throw new Error(STRINGS.notFound('Order'));

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
    if (!orderStatusFound) throw new Error(STRINGS.notFound('Order Status'));

    return this.repo.remove(orderStatusFound);
  }
}
