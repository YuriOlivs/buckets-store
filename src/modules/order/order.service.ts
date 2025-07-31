import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OrderCreateDTO } from './dto/OrderCreate.dto';
import OrderRepository from './order.repository';
import ProductService from '../product/product.service';
import { OrderItemEntity } from '../order-item/order-item.entity';
import { OrderEntity } from './order.entity';
import UserService from '../user/user.service';
import { OrderStatusEntity } from '../order-status/order-status.entity';
import { StatusCodeEnum } from '../order-status/enum/statusCode.enum';
import { StatusTextEnum } from '../order-status/enum/statusText.enum';

@Injectable()
export default class OrderService {
  constructor(
    private repo: OrderRepository,
    private productService: ProductService,
    private userService: UserService
  ) {}

  async createOrder(dto: OrderCreateDTO): Promise<OrderEntity> {
    const orderItems: OrderItemEntity[] = [];
    let totalValue: number = 0;

    const user = await this.userService.getUserById(dto.user);
    if (!user) throw new NotFoundException('User not found');

    for (const item of dto.products) {
      const product = await this.productService.getProductById(item.product);
      if (!product) throw new NotFoundException('Product not found');

      const orderItem = new OrderItemEntity(
        product, 
        item.quantity, 
        product.price
      );

      totalValue += orderItem.salePrice * orderItem.quantity;
      orderItems.push(orderItem);
    }

    const orderStatus = new OrderStatusEntity(
      StatusCodeEnum.PENDING_PAYMENT, 
      StatusTextEnum.PENDING_PAYMENT, 
      new Date()
    );

    const order = new OrderEntity(
      totalValue,
      user,
      orderItems,
      orderStatus
    );

    return await this.repo.save(order);
  }

  async findOrdersByUser(id: string): Promise<OrderEntity[]> {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException('User not found');
    
    return await this.repo.findOrdersByUser(id);
  }

  async findOrderById(id: string): Promise<OrderEntity> {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException('Order not found');

    return order;
  }

  async cancelOrder(id: string) {
    const orderFound = await this.repo.findById(id);
    if (!orderFound) throw new NotFoundException('Order not found');

    const canceledStatus = new OrderStatusEntity(
      StatusCodeEnum.CANCELED, 
      StatusTextEnum.CANCELED, 
      new Date()
    );
    
    orderFound.orderStatus = canceledStatus;

    return this.repo.save(orderFound);
  }
}
