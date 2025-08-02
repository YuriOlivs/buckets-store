import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import OrderService from './order.service';
import { OrderCreateDTO } from './dto/order-create.dto';
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
    const orderFound = await this.orderService.findOrderById(id);
    return OrderMapper.toDTO(orderFound);
  }

  @Get('/by-user/:id')
  async findByUser(@Param('id') id: string) {
    const ordersFound = await this.orderService.findOrdersByUser(id);
    return ordersFound.map(order => OrderMapper.toDTO(order));
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    await this.orderService.cancelOrder(id);
    return { message: STRINGS.entityDeleted('Order'), payload: {} };
  }
}
