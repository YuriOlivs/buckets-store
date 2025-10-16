import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { EmptyListToNoContentInterceptor } from 'src/common/interceptor/empty-list-to-no-content.interceptor';
import { STRINGS } from 'src/common/strings/global.strings';
import { AuthGuard } from '../auth/auth.guard';
import RequestWithUser from '../auth/dto/req-with-user.dto';
import { OrderStatusCreateDTO } from '../order-status/dto/order-status-create.dto';
import { OrderCreateDTO } from './dto/order/order-create.dto';
import OrderMapper from './dto/order/order.mapper';
import OrderService from './order.service';
import { AdminGuard } from 'src/common/guards/admin.guard';
import UserPayload from '../auth/dto/user-payload.dto';

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
    const orderCreated = await this.orderService.create(userId, orderCreateDTO);

    return {
      message: STRINGS.entityCreated('Order'),
      payload: OrderMapper.toDTO(orderCreated)
    };
  }

  @UseGuards(AdminGuard)
  @Put('/update-status/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() status: OrderStatusCreateDTO
  ) {
    const orderUpdated = await this.orderService.updateStatus(id, status);
    return {
      message: STRINGS.entityUpdated('Order'),
      payload: OrderMapper.toDTO(orderUpdated)
    };
  }

  @Patch('/update-address/:id/:addressId')
  async updateAddress(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Param('addressId') addressId: string
  ) {
    const orderUpdated = await this.orderService.updateAddress(id, addressId, req.user);

    return {
      message: STRINGS.entityUpdated('Order'),
      payload: OrderMapper.toDTO(orderUpdated)
    };
  }

  @Get('/by-user')
  @UseInterceptors(CacheInterceptor, EmptyListToNoContentInterceptor)
  async findByUser(
    @Req() req: RequestWithUser
  ) {
    const userId = req.user.sub;

    const ordersFound = await this.orderService.findByUser(userId);
    return ordersFound.map(order => OrderMapper.toDTO(order));
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async findById(@Param('id') id: string) {
    const orderFound = await this.orderService.findById(id);
    return OrderMapper.toDTO(orderFound);
  }

  @Delete('/:id')
  async remove(
    @Req() req: RequestWithUser,
    @Param('id') id: string
  ) {
    await this.orderService.cancel(id, req.user);

    return {
      message: STRINGS.entityDeleted('Order'),
      payload: {}
    };
  }
}
