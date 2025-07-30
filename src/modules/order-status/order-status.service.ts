import { Injectable } from '@nestjs/common';
import { OrderStatusCreateDTO } from './dto/OrderStatusCreate.dto';
import { OrderStatusUpdateDTO } from './dto/OrderStatusUpdate.dto';
import OrderStatusRepository from './order-status.repository';
import { OrderStatusEntity } from './order-status.entity';
import OrderService from '../order/order.service';
import { StatusCodeEnum } from './enum/statusCode.enum';
import { StatusTextEnum } from './enum/statusText.enum';

@Injectable()
export class OrderStatusService {
  constructor(
    private repo: OrderStatusRepository,
    private orderService: OrderService
  ) {}

  async createOrderStatus(dto: OrderStatusCreateDTO): Promise<OrderStatusEntity> {
    const statusCode = dto.statusCode ?? StatusCodeEnum.PENDING_PAYMENT;
    const statusText = dto.statusText ?? StatusTextEnum.PENDING_PAYMENT;
    const order = await this.orderService.findOrderById(dto.order);
    if(!order) throw new Error('Order not found');

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

  async updateOrderStatus(id: string, dto: OrderStatusUpdateDTO) {
    const orderStatusFound = await this.repo.findById(id);
    if (!orderStatusFound) throw new Error('OrderStatus not found');

    return `This action updates a #${id} orderStatus`;
  }

  async removeOrderStatus(id: string) {
    const orderStatusFound = await this.repo.findById(id);
    if (!orderStatusFound) throw new Error('OrderStatus not found');
    
    return this.repo.remove(orderStatusFound);
  }
}
