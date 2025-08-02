import { InjectRepository } from "@nestjs/typeorm";
import { AddressEntity } from "./address.entity";
import { Repository } from "typeorm";

export default class AddressRepository {
   constructor(
      @InjectRepository(AddressEntity)
      private readonly repository: Repository<AddressEntity>
   ) {}

   async findByUser(id: string): Promise<AddressEntity[]> {
      return await this.repository.find({
         where: { user: { id: id } }
      });
   }

   async findById(id: string): Promise<AddressEntity | null> {
      return await this.repository.findOne({ where: { id } });
   }

   async save(address: AddressEntity): Promise<AddressEntity> {
      return await this.repository.save(address);
   }

   async remove(address: AddressEntity): Promise<AddressEntity> {
      return await this.repository.remove(address);
   }
}