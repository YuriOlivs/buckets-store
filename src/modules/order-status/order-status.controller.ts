import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderStatusService } from './order-status.service';
import { OrderStatusCreateDTO } from './dto/OrderStatusCreate.dto';
import { OrderStatusUpdateDTO } from './dto/OrderStatusUpdate.dto';

@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) { }

  @Post()
  create(@Body() OrderStatusCreateDTO: OrderStatusCreateDTO) {
    return this.orderStatusService.create(OrderStatusCreateDTO);
  }

  @Get()
  findAll() {
    return this.orderStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() OrderStatusUpdateDTO: OrderStatusUpdateDTO) {
    return this.orderStatusService.update(+id, OrderStatusUpdateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderStatusService.remove(+id);
  }
}
