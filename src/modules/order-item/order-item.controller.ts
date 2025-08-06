import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import OrderItemCreateDTO from './dto/order-item-create.dto';
import OrderItemUpdateDTO from './dto/order-item-update.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) { }

  @Post()
  createOrderItem(@Body() OrderItemCreateDTO: OrderItemCreateDTO) {
    return this.orderItemService.createOrderItem(OrderItemCreateDTO);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  findAllOrderItems() {
    return this.orderItemService.findAllOrderItems();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  findOrderItemById(@Param('id') id: string) {
    return this.orderItemService.findOrderItemById(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() OrderItemUpdateDTO: OrderItemUpdateDTO) {
    return this.orderItemService.updateOrderItem(id, OrderItemUpdateDTO);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.orderItemService.removeOrderItem(id);
  }
}
