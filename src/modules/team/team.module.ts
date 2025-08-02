import { Module } from "@nestjs/common";
import TeamController from "./team.controller";
import TeamRepository from "./team.repository";
import { isNameUniqueValidtor } from "./validations/is-name-unique.validator";
import { TypeOrmModule } from "@nestjs/typeorm";
import TeamEntity from "./team.entity";
import TeamService from "./team.service";
import { ImageModule } from "../image/image.module";

@Module({
   imports: [
      TypeOrmModule.forFeature([TeamEntity]),
      ImageModule,
   ],
   exports: [TeamService],
   controllers: [TeamController],
   providers: [
      TeamService, 
      TeamRepository, 
      isNameUniqueValidtor
   ],
})
export class TeamModule {}