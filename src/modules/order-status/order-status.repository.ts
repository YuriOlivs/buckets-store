import { InjectRepository } from "@nestjs/typeorm";
import { OrderStatusEntity } from "./order-status.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class OrderStatusRepository {
   constructor(
      @InjectRepository(OrderStatusEntity)
      private readonly repository: Repository<OrderStatusEntity>
   ) {}

   async save(orderStatus: OrderStatusEntity): Promise<OrderStatusEntity> {
      return await this.repository.save(orderStatus);
   }

   async findAll(): Promise<OrderStatusEntity[]> {
      return await this.repository.find();
   }

   async findById(id: string): Promise<OrderStatusEntity | null> {
      return await this.repository.findOne({ where: { id } });
   }

   async remove(orderStatus: OrderStatusEntity) {
      return await this.repository.delete(orderStatus);
   }
}