import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
import { StockService } from '../stock/stock.service';
import { StockStatusEnum } from '../stock/enum/stock-status.enum';
import CartEntity from '../cart/entities/cart.entity';
import { StockEntity } from '../stock/stock.entity';
import StockUpdateListDTO from '../stock/dto/stock-update-list.dto';
import { StockUpdateDTO } from '../stock/dto/stock-update-dto';
import UserPayload from '../auth/dto/user-payload.dto';

@Injectable()
export default class OrderService {
  constructor(
    private repo: OrderRepository,
    private userService: UserService,
    private addressService: AddressService,
    private cartService: CartService,
    private stockService: StockService
  ) { }

  async create(userId: string, dto: OrderCreateDTO): Promise<OrderEntity> {
    const orderItems: OrderItemEntity[] = [];

    const [user, address, cart] = await Promise.all([
      this.userService.findById(userId),
      this.addressService.findById(dto.address),
      this.cartService.findById(dto.cart)
    ]);
    const stockList = await this.findProductsStock(cart);

    for (const item of cart.cartItems) {
      const orderItem = new OrderItemEntity(
        item.product,
        item.quantity,
        item.product.price
      );

      orderItems.push(orderItem);
    }

    if (orderItems.length === 0) {
      throw new BadRequestException(STRINGS.noItemsInCart());
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

    await this.validateStock(stockList);
    await this.updateStock(stockList, orderItems);
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

  async updateAddress(id: string, addressId: string, user: UserPayload) {
    const order = await this.repo.findById(id);
    if (!order) throw new NotFoundException(STRINGS.notFound('Order'));

    const address = await this.addressService.findById(addressId);
    if (!address) throw new NotFoundException(STRINGS.notFound('Address'));

    if(user.role !== 'ADMIN') {
      if (order.user.id !== user.sub) {
        throw new ForbiddenException('You do not have permission to update this order.');
      }
    }

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

  async cancel(id: string, user: UserPayload) {
    const orderFound = await this.repo.findById(id);
    if (!orderFound) throw new NotFoundException(STRINGS.notFound('Order'));

    if(user.role !== 'ADMIN') {
      if (orderFound.user.id !== user.sub) {
        throw new ForbiddenException('You do not have permission to cancel this order.');
      }
    }

    const canceledStatus = orderFound.orderStatus;
    canceledStatus.statusCode = OrderStatusCodeEnum.CANCELED;
    canceledStatus.statusText = OrderStatusTextEnum.CANCELED;
    canceledStatus.statusDate = new Date();

    orderFound.orderStatus = canceledStatus;

    return this.repo.save(orderFound);
  }

  private async findProductsStock(cart: CartEntity): Promise<StockEntity[]> {
    let stockList: StockEntity[] = [];

    for (const item of cart.cartItems) {
      const stock = await this.stockService.findByProduct(item.product.id);
      stockList.push(stock);
    }

    return stockList;
  }

  private async validateStock(stockList: StockEntity[]) {
    let outOfStockItems: StockEntity[] = [];

    for (const stock of stockList) {
      if (stock.status === StockStatusEnum.OUT_OF_STOCK) {
        outOfStockItems.push(stock);
      }
    }

    if (outOfStockItems.length > 0) {
      throw new Error(STRINGS.outOfStock(outOfStockItems.map(item => item.product.name).join(', ')));
    }
  }

  private async updateStock(stockList: StockEntity[], orderItems: OrderItemEntity[]) {
    const updatedList: StockEntity[] = [];

    for (const stock of stockList) {
      const quantityBought = orderItems.find(item => item.product.id === stock.product.id)?.quantity ?? 0;
      const newQuantity = stock.quantity - quantityBought;

      if (newQuantity < 0) {
        throw new BadRequestException(STRINGS.notEnoughStock(stock.product.name));
      }

      stock.quantity = newQuantity;
      updatedList.push(stock);
    }

    return await this.stockService.updateStockByEntity(updatedList);
  }
}
