import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import OrderService from './order.service';
import { OrderCreateDTO } from './dto/OrderCreate.dto';
import { STRINGS } from 'src/common/strings/global.strings';
import OrderMapper from './dto/order.mapper';

@Controller('orders')
export default class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async create(@Body() orderCreateDTO: OrderCreateDTO) {
    const orderCreated = await this.orderService.createOrder(orderCreateDTO);
    return { message: STRINGS.entityCreated('Order'), payload: OrderMapper.toDTO(orderCreated) };
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
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
