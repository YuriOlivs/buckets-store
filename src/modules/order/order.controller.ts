import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import OrderService from './order.service';
import { OrderCreateDTO } from './dto/OrderCreate.dto';

@Controller('order')
export default class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async create(@Body() OrderCreateDTO: OrderCreateDTO) {
    return await this.orderService.createOrder(OrderCreateDTO);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOrderById(id);
  }

  @Get('/by-user/:id')
  async findByUser(@Param('id') id: string) {
    return await this.orderService.findOrdersByUser(id);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.orderService.cancelOrder(id);
  }
}
