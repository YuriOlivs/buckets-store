import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import OrderItemCreateDTO from './dto/OrderItemCreate.dto';
import OrderItemUpdateDTO from './dto/OrderItemUpdate.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) { }

  @Post()
  create(@Body() OrderItemCreateDTO: OrderItemCreateDTO) {
    return this.orderItemService.create(OrderItemCreateDTO);
  }

  @Get()
  findAll() {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() OrderItemUpdateDTO: OrderItemUpdateDTO) {
    return this.orderItemService.update(+id, OrderItemUpdateDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemService.remove(+id);
  }
}
