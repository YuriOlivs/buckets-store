import { Injectable } from '@nestjs/common';
import OrderItemCreateDTO from './dto/OrderItemCreate.dto';
import OrderItemUpdateDTO from './dto/OrderItemUpdate.dto';

@Injectable()
export class OrderItemService {
  create(OrderItemCreateDTO: OrderItemCreateDTO) {
    return 'This action adds a new orderItem';
  }

  findAll() {
    return `This action returns all orderItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, OrderItemUpdateDTO: OrderItemUpdateDTO) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
