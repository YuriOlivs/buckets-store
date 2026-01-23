import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { OrderStatusCreateDTO } from './dto/order-status-create.dto';
import { OrderStatusService } from './order-status.service';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Order Statuses')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, AdminGuard)
@Controller('order-status')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) { }

  @Post()
  create(@Body() OrderStatusCreateDTO: OrderStatusCreateDTO) {
    return this.orderStatusService.createOrderStatus(OrderStatusCreateDTO);
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  findOne(@Param('id') id: string) {
    return this.orderStatusService.findOrderStatusById(id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.orderStatusService.removeOrderStatus(id);
  }
}
