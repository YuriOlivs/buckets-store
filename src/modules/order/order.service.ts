import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { OrderCreateDTO } from './dto/OrderCreate.dto';
import { OrderUpdateDTO } from './dto/OrderUpdate.dto';
import ProductEntity from '../product/product.entity';
import OrderRepository from './order.repository';
import ProductService from '../product/product.service';
import { OrderItemEntity } from '../order-item/order-item.entity';
import { OrderEntity } from './order.entity';
import UserService from '../user/user.service';
import { OrderStatusService } from '../order-status/order-status.service';
import { OrderStatusEntity } from '../order-status/order-status.entity';
import { OrderItemService } from '../order-item/order-item.service';
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

      totalValue += orderItem.salePrice;
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

  async findAllOrders(): Promise<OrderEntity[]> {
    return await this.repo.findAll();
  }

  async findOrderById(id: string): Promise<OrderEntity | null> {
    return await this.repo.findById(id);
  }

  updateOrder(id: string, OrderUpdateDTO: OrderUpdateDTO) {
    return `This action updates a #${id} order`;
  }

  async removeOrder(id: string) {
    const orderFound = await this.repo.findById(id);
    if (!orderFound) throw new NotFoundException('Order not found');
    
    return this.repo.remove(orderFound);
  }
}
