import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { OwnershipGuard } from 'src/common/guards/ownership.guard';
import { EmptyListToNoContentInterceptor } from 'src/common/interceptor/empty-list-to-no-content.interceptor';
import { STRINGS } from 'src/common/strings/global.strings';
import { AuthGuard } from '../auth/auth.guard';
import RequestWithUser from '../auth/dto/req-with-user.dto';
import { OrderStatusCreateDTO } from '../order-status/dto/order-status-create.dto';
import { OrderCreateDTO } from './dto/order/order-create.dto';
import OrderMapper from './dto/order/order.mapper';
import OrderService from './order.service';

@UseGuards(AuthGuard)
@Controller('orders')
export default class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() orderCreateDTO: OrderCreateDTO,
  ) {
    const userId = req.user.sub;
    const orderCreated = await this.orderService.createOrder(userId, orderCreateDTO);

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
  @UseGuards(OwnershipGuard)
  @UseInterceptors(CacheInterceptor, EmptyListToNoContentInterceptor)
  async findByUser(@Param('id') id: string) {
    const ordersFound = await this.orderService.findOrdersByUser(id);
    return ordersFound.map(order => OrderMapper.toDTO(order));
  }

  @Delete('/:id')
  async remove(
    @Req() req: RequestWithUser,
    @Param('id') id: string
  ) {
    await this.orderService.cancelOrder(id, req.user.sub);

    return {
      message: STRINGS.entityDeleted('Order'),
      payload: {}
    };
  }
}
