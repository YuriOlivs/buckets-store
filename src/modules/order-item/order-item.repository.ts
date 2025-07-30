import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItemEntity } from "./order-item.entity";
import { Repository } from "typeorm";

@Injectable()
export default class OrderItemRepository {
   constructor(
      @InjectRepository(OrderItemEntity)
      private readonly repository: Repository<OrderItemEntity>,
   ) {}

   async save(orderItem: OrderItemEntity): Promise<OrderItemEntity> {
      return await this.repository.save(orderItem);
   }

   async findAll(): Promise<OrderItemEntity[]> {
      return await this.repository.find();
   }

   async findById(id: string): Promise<OrderItemEntity | null> {
      return await this.repository.findOne({ where: { id } });
   }

   async remove(orderItem: OrderItemEntity): Promise<OrderItemEntity> {
      return await this.repository.remove(orderItem);
   }
}