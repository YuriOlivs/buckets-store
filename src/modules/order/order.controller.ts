import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import OrderService from './order.service';
import { OrderCreateDTO } from './dto/OrderCreate.dto';
import { OrderUpdateDTO } from './dto/OrderUpdate.dto';

@Controller('order')
export default class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() OrderCreateDTO: OrderCreateDTO) {
    return this.orderService.create(OrderCreateDTO);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() OrderUpdateDTO: OrderUpdateDTO) {
    return this.orderService.update(+id, OrderUpdateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
