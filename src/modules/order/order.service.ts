import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderCreateDTO } from './dto/OrderCreate.dto';
import { OrderUpdateDTO } from './dto/OrderUpdate.dto';
import ProductEntity from '../product/product.entity';
import OrderRepository from './order.repository';
import ProductService from '../product/product.service';
import { OrderItemEntity } from '../order-item/order-item.entity';

@Injectable()
export default class OrderService {
  constructor(
    private repo: OrderRepository,
    private productService: ProductService
  ) {}

  createOrder(dto: OrderCreateDTO) {
    const products: ProductEntity[] = [];
    const orderItems: OrderItemEntity[] = [];
    
    dto.products.forEach(async item => {
      const productFound = await this.productService.getProductById(item.product.id);
      if(!productFound) throw new NotFoundException('Product not found');

      products.push(productFound);
    });

    
  }

  findAllOrders() {
    return `This action returns all order`;
  }

  findOrderById(id: string) {
    return `This action returns a #${id} order`;
  }

  updateOrder(id: string, OrderUpdateDTO: OrderUpdateDTO) {
    return `This action updates a #${id} order`;
  }

  removeOrder(id: string) {
    return `This action removes a #${id} order`;
  }
}
