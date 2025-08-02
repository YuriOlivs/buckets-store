import { BadRequestException, Injectable } from '@nestjs/common';
import OrderItemCreateDTO from './dto/order-item-create.dto';
import OrderItemUpdateDTO from './dto/order-item-update.dto';
import OrderItemRepository from './order-item.repository';
import { OrderItemEntity } from './order-item.entity';
import ProductService from '../product/product.service';
import OrderService from '../order/order.service';

@Injectable()
export class OrderItemService {
  constructor(
    private repo: OrderItemRepository,
    private productService: ProductService,
    private orderService: OrderService
  ) { }

  async createOrderItem(dtos: OrderItemCreateDTO) {
    const product = await this.productService.getProductById(dtos.product);
    if (!product) throw new BadRequestException('Product not found');

    const order = await this.orderService.findOrderById(dtos.order);
    if (!order) throw new BadRequestException('Order not found');

    const orderItem = new OrderItemEntity(product, dtos.quantity, product.price, order);
    return await this.repo.save(orderItem);
  }

  async findAllOrderItems() {
    return await this.repo.findAll();
  }

  async findOrderItemById(id: string) {
    return await this.repo.findById(id);
  }

  async updateOrderItem(id: string, dto: OrderItemUpdateDTO) {
    return `This action updates a #${id} orderItem`;
  }

  async removeOrderItem(id: string) {
    const orderItemFound = await this.repo.findById(id);
    if (!orderItemFound) throw new BadRequestException('OrderItem not found');

    return await this.repo.remove(orderItemFound);
  }
}
