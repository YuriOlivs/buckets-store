import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleEntity } from "./role.entity";
import { Repository } from "typeorm";

@Injectable()
export default class RoleRepository {
   constructor(
      @InjectRepository(RoleEntity)
      private readonly repository: Repository<RoleEntity>
   ) {}

   async findAll(): Promise<RoleEntity[]> {
      return await this.repository.find();
   }

   async findAllWithUsers(): Promise<RoleEntity[]> {
      return await this.repository.find({ relations: ['users'] });
   }

   async findById(id: string) {
      return await this.repository.findOne({ where: { id } });
   }

   async findByName(name: string) {
      return await this.repository.findOne({ where: { name } });
   }

   async save(role: RoleEntity) {
      return await this.repository.save(role);
   }

   async remove(role: RoleEntity) {
      return await this.repository.remove(role);
   }
}