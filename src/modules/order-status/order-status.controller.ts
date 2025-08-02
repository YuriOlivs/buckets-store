import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusCreateDTO } from './dto/order-status-create.dto';
import { OrderStatusUpdateDTO } from './dto/order-status-update.dto';

@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) { }

  @Post()
  create(@Body() OrderStatusCreateDTO: OrderStatusCreateDTO) {
    return this.orderStatusService.createOrderStatus(OrderStatusCreateDTO);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.orderStatusService.findOrderStatusById(id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.orderStatusService.removeOrderStatus(id);
  }
}
