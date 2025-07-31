import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import OrderService from './order.service';
import { OrderCreateDTO } from './dto/OrderCreate.dto';

@Controller('order')
export default class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() OrderCreateDTO: OrderCreateDTO) {
    return this.orderService.createOrder(OrderCreateDTO);
  }

  @Get()
  findAll() {
    return this.orderService.findAllOrders();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOrderById(id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.orderService.removeOrder(id);
  }
}
