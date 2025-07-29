import { Injectable } from '@nestjs/common';
import { OrderStatusCreateDTO } from './dto/OrderStatusCreate.dto';
import { OrderStatusUpdateDTO } from './dto/OrderStatusUpdate.dto';

@Injectable()
export class OrderStatusService {
  save(OrderStatusCreateDTO: OrderStatusCreateDTO) {
    return 'This action adds a new orderStatus';
  }

  findAll() {
    return `This action returns all orderStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderStatus`;
  }

  update(id: number, OrderStatusUpdateDTO: OrderStatusUpdateDTO) {
    return `This action updates a #${id} orderStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderStatus`;
  }
}
