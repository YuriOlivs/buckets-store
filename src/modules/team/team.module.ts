import { Module } from "@nestjs/common";
import TeamController from "./team.controller";
import TeamRepository from "./team.repository";
import { isNameUniqueValidtor } from "./validations/isNameUnique.validator";
import { TypeOrmModule } from "@nestjs/typeorm";
import TeamEntity from "./team.entity";
import TeamService from "./team.service";

@Module({
   imports: [TypeOrmModule.forFeature([TeamEntity])],
   controllers: [TeamController],
   providers: [
      TeamService, 
      TeamRepository, 
      isNameUniqueValidtor
   ],
})
export class TeamModule {}