import { Injectable } from '@nestjs/common';
import { OrderCreateDTO } from './dto/OrderCreate.dto';
import { OrderUpdateDTO } from './dto/OrderUpdate.dto';

@Injectable()
export default class OrderService {
  create(OrderCreateDTO: OrderCreateDTO) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, OrderUpdateDTO: OrderUpdateDTO) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
