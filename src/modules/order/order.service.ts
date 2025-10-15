import { Injectable, NotFoundException } from '@nestjs/common';
import { STRINGS } from 'src/common/strings/global.strings';
import { AddressService } from '../address/address.service';
import { CartService } from '../cart/cart.service';
import { OrderStatusCreateDTO } from '../order-status/dto/order-status-create.dto';
import { OrderStatusCodeEnum } from '../order-status/enum/order-status-code.enum';
import { OrderStatusTextEnum } from '../order-status/enum/order-status-text.enum';
import { OrderStatusEntity } from '../order-status/order-status.entity';
import UserService from '../user/user.service';
import { OrderCreateDTO } from './dto/order/order-create.dto';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderEntity } from './entities/order.entity';
import OrderRepository from './order.repository';

@Injectable()
export default class OrderService {
  constructor(
    private repo: OrderRepository,
    private userService: UserService,
    private addressService: AddressService,
    private cartService: CartService
  ) { }

  async create(userId: string, dto: OrderCreateDTO): Promise<OrderEntity> {
    const orderItems: OrderItemEntity[] = [];

    const user = await this.userService.findById(userId);
    const address = await this.addressService.findById(dto.address);
    const cart = await this.cartService.findById(dto.cart);

    for (const item of cart.cartItems) {
      const orderItem = new OrderItemEntity(
        item.product,
        item.quantity,
        item.product.price
      );

      orderItems.push(orderItem);
    }

    const orderStatus = new OrderStatusEntity(
      OrderStatusCodeEnum.PENDING_PAYMENT,
      OrderStatusTextEnum.PENDING_PAYMENT,
      new Date()
    );

    const order = new OrderEntity(
      cart.totalValue,
      cart.rawValue,
      cart.discountValue,
      user,
      orderItems,
      orderStatus,
      address,
      cart.coupon ?? null
    );

    const savedOrder = await this.repo.save(order);
    await this.cartService.clear(userId);

    return savedOrder;
  }

  async updateStatus(id: string, status: OrderStatusCreateDTO) {
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

  async updateAddress(id: string, addressId: string) {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException(STRINGS.notFound('Order'));

    const address = await this.addressService.findById(addressId);
    if (!address) throw new NotFoundException(STRINGS.notFound('Address'));

    order.address = address;
    return this.repo.save(order);
  }

  async findByUser(id: string): Promise<OrderEntity[]> {
    const user = await this.userService.findById(id);
    if (!user) throw new NotFoundException(STRINGS.notFound('User'));

    return await this.repo.findByUser(id);
  }

  async findById(id: string): Promise<OrderEntity> {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException(STRINGS.notFound('Order'));

    return order;
  }

  async cancel(id: string, userId: string) {
    const orderFound = await this.repo.findById(id);
    if (!orderFound) throw new NotFoundException(STRINGS.notFound('Order'));

    const canceledStatus = orderFound.orderStatus;
    canceledStatus.statusCode = OrderStatusCodeEnum.CANCELED;
    canceledStatus.statusText = OrderStatusTextEnum.CANCELED;
    canceledStatus.statusDate = new Date();

    orderFound.orderStatus = canceledStatus;

    return this.repo.save(orderFound);
  }
}
