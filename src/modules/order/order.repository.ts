import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "./entities/order.entity";

@Injectable()
export default class OrderRepository {
   constructor(
      @InjectRepository(OrderEntity)
      private readonly repository: Repository<OrderEntity>
   ) { }

   async findOrdersByUser(id: string): Promise<OrderEntity[]> {
      return await this.repository.find({
         where: { user: { id: id } },
         relations: [
            'orderStatus',
            'orderItems',
            'orderItems.product'
         ],
         order: { createdAt: "DESC" }
      });
   }

   async findById(id: string): Promise<OrderEntity | null> {
      return await this.repository.findOne({
         where: { id: id },
         relations: [
            'orderStatus',
            'orderItems',
            'orderItems.product'
         ],
         order: { createdAt: "DESC" }
      });
   }

   async save(order: OrderEntity): Promise<OrderEntity> {
      return await this.repository.save(order);
   }

   async remove(order: OrderEntity): Promise<OrderEntity> {
      return await this.repository.remove(order);
   }
}