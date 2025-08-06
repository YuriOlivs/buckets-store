import { Injectable } from "@nestjs/common";
import TeamCreateDTO from "./dto/team-create.dto";
import TeamEntity from "./team.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export default class TeamRepository {
   constructor(
      @InjectRepository(TeamEntity)
      private readonly repository: Repository<TeamEntity>,
   ) { }

   async save(team: TeamEntity): Promise<TeamEntity> {
      return await this.repository.save(team);
   }

   async getAll(): Promise<TeamEntity[]> {
      return await this.repository.find({ relations: ['logo'] });
   }

   async getById(id: string): Promise<TeamEntity | null> {
      return await this.repository.findOne({
         where: { id },
         relations: ['logo']
      });
   }

   async getByName(name: string): Promise<TeamEntity | null> {
      return await this.repository.findOne({
         where: { name },
         relations: ['logo']
      });
   }

   async remove(user: TeamEntity): Promise<TeamEntity> {
      return await this.repository.softRemove(user);
   }
}