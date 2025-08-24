import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import TeamEntity from "./team.entity";

@Injectable()
export default class TeamRepository {
   constructor(
      @InjectRepository(TeamEntity)
      private readonly repository: Repository<TeamEntity>,
   ) { }

   async save(team: TeamEntity): Promise<TeamEntity> {
      return await this.repository.save(team);
   }

   async findAll(): Promise<TeamEntity[]> {
      return await this.repository.find({ relations: ['logo'] });
   }

   async findById(id: string): Promise<TeamEntity | null> {
      return await this.repository.findOne({
         where: { id },
         relations: ['logo']
      });
   }

   async findByName(name: string): Promise<TeamEntity | null> {
      return await this.repository.findOne({
         where: { name },
         relations: ['logo']
      });
   }

   async remove(user: TeamEntity): Promise<TeamEntity> {
      return await this.repository.softRemove(user);
   }
}