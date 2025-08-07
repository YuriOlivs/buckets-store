import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseInterceptors, HttpStatus } from '@nestjs/common';
import OrderService from './order.service';
import { OrderCreateDTO } from './dto/order-create.dto';
import { STRINGS } from 'src/common/strings/global.strings';
import OrderMapper from './dto/order.mapper';
import { OrderStatusCreateDTO } from '../order-status/dto/order-status-create.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { EmptyListToNoContentInterceptor } from 'src/common/interceptor/empty-list-to-no-content.interceptor';

@Controller('orders')
export default class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async create(@Body() orderCreateDTO: OrderCreateDTO) {
    const orderCreated = await this.orderService.createOrder(orderCreateDTO);
    return {
      message: STRINGS.entityCreated('Order'),
      payload: OrderMapper.toDTO(orderCreated)

    };
  }

  @Put('/update-status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() status: OrderStatusCreateDTO
  ) {
    const orderUpdated = await this.orderService.updateOrderStatus(id, status);
    return {
      message: STRINGS.entityUpdated('Order'),
      payload: OrderMapper.toDTO(orderUpdated)
    };
  }

  @Patch('/update-address/:id/:addressId')
  async updateAddress(
    @Param('id') id: string,
    @Param('addressId') addressId: string
  ) {
    const orderUpdated = await this.orderService.updateOrderAddress(id, addressId);
    return {
      message: STRINGS.entityUpdated('Order'),
      payload: OrderMapper.toDTO(orderUpdated)
    };
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async findById(@Param('id') id: string) {
    const orderFound = await this.orderService.findOrderById(id);
    return OrderMapper.toDTO(orderFound);
  }

  @Get('/by-user/:id')
  @UseInterceptors(CacheInterceptor, EmptyListToNoContentInterceptor)
  async findByUser(@Param('id') id: string) {
    const ordersFound = await this.orderService.findOrdersByUser(id);
    return ordersFound.map(order => OrderMapper.toDTO(order));
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    await this.orderService.cancelOrder(id);
    return {
      message: STRINGS.entityDeleted('Order'),
      payload: {}
    };
  }
}
