import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { STRINGS } from 'src/common/strings/global.strings';
import { AddressService } from '../address/address.service';
import { CartService } from '../cart/cart.service';
import { OrderStatusCreateDTO } from '../order-status/dto/order-status-create.dto';
import { OrderStatusCodeEnum } from '../order-status/enum/order-status-code.enum';
import { OrderStatusTextEnum } from '../order-status/enum/order-status-text.enum';
import { OrderStatusEntity } from '../order-status/order-status.entity';
import ProductService from '../product/product.service';
import UserService from '../user/user.service';
import { OrderCreateDTO } from './dto/order/order-create.dto';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderEntity } from './entities/order.entity';
import OrderRepository from './order.repository';

@Injectable()
export default class OrderService {
  constructor(
    private repo: OrderRepository,
    private productService: ProductService,
    private userService: UserService,
    private addressService: AddressService,
    private cartService: CartService
  ) { }

  async createOrder(userId: string, dto: OrderCreateDTO): Promise<OrderEntity> {
    const orderItems: OrderItemEntity[] = [];
    let totalValue: number = 0;

    const user = await this.userService.getUserById(userId);
    const address = await this.addressService.findById(dto.address);
    const cart = await this.cartService.findById(dto.cart);

    for (const item of cart.cartItems) {
      const orderItem = new OrderItemEntity(
        item.product,
        item.quantity,
        item.product.price
      );

      orderItems.push(orderItem);
      totalValue += orderItem.salePrice * orderItem.quantity;
    }

    const orderStatus = new OrderStatusEntity(
      OrderStatusCodeEnum.PENDING_PAYMENT,
      OrderStatusTextEnum.PENDING_PAYMENT,
      new Date()
    );

    const order = new OrderEntity(
      totalValue,
      user,
      orderItems,
      orderStatus,
      address
    );

    return await this.repo.save(order);
  }

  async updateOrderStatus(id: string, status: OrderStatusCreateDTO) {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException(STRINGS.notFound('Order'));

    const newStatus = new OrderStatusEntity(
      status.statusCode,
      status.statusText,
      new Date(),
      order
    );

    order.orderStatus = newStatus;
    return this.repo.save(order);
  }

  async updateOrderAddress(id: string, addressId: string) {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException(STRINGS.notFound('Order'));

    const address = await this.addressService.findById(addressId);
    if (!address) throw new NotFoundException(STRINGS.notFound('Address'));

    order.address = address;
    return this.repo.save(order);
  }

  async findOrdersByUser(id: string): Promise<OrderEntity[]> {
    const user = await this.userService.getUserById(id);
    if (!user) throw new NotFoundException(STRINGS.notFound('User'));

    return await this.repo.findOrdersByUser(id);
  }

  async findOrderById(id: string): Promise<OrderEntity> {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException(STRINGS.notFound('Order'));

    return order;
  }

  async cancelOrder(id: string, userId: string) {
    const orderFound = await this.repo.findById(id);
    if (!orderFound) throw new NotFoundException(STRINGS.notFound('Order'));

    if (orderFound.user.id !== userId) throw new ForbiddenException(STRINGS.notAuthorized());

    const canceledStatus = new OrderStatusEntity(
      OrderStatusCodeEnum.CANCELED,
      OrderStatusTextEnum.CANCELED,
      new Date()
    );

    orderFound.orderStatus = canceledStatus;

    return this.repo.save(orderFound);
  }
}
