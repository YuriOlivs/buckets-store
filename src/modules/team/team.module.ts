import { Module } from "@nestjs/common";
import TeamController from "./team.controller";
import { TeamRepository } from "./team.repository";
import { isNameUniqueValidtor } from "./validations/isNameUnique.validator";

@Module({
   controllers: [TeamController],
   providers: [TeamRepository, isNameUniqueValidtor],
})
export class TeamModule {}