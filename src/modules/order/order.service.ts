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

@Injectable()
export default class OrderService {
  constructor(
    private repo: OrderRepository,
    private productService: ProductService,
    private userService: UserService,
    private orderStatusService: OrderStatusService,
    private orderItemService: OrderItemService
  ) {}

  async createOrder(dto: OrderCreateDTO) {
    // const products: ProductEntity[] = [];
    // const orderItems: OrderItemEntity[] = [];
    // let totalValue = 0;
    
    // const userFound = await this.userService.getUserById(dto.user);
    // if(!userFound) throw new NotFoundException('User not found');

    // dto.products.forEach(async item => {
    //   const productFound = await this.productService.getProductById(item.product.id);
    //   if(!productFound) throw new NotFoundException('Product not found');

    //   const productValue = productFound.price * item.quantity;
    //   totalValue += productValue;

    //   products.push(productFound);
    // });

    // //creating order
    // const order = new OrderEntity(totalValue, userFound);
    // const orderCreated = await this.repo.save(order);

    // if (!orderCreated) { throw new InternalServerErrorException('Error creating order'); }

    // //creating order status
    // const orderStatus = new OrderStatusEntity(orderCreated, 'Waiting payment', new Date());
    // const orderStatusCreated = await this.orderStatusService.save(orderStatus);

    // if (!orderStatusCreated) { throw new InternalServerErrorException('Error creating order status'); }

    // //creating order item
    
    // return orderCreated;
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
