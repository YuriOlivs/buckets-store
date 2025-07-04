import { Body, Controller } from "@nestjs/common";
import { TeamRepository } from "./team.repository";
import CreateTeamDTO from "./dto/CreateTeamDTO";

@Controller("/team")
export default class TeamController {
   constructor(private repository: TeamRepository) {}

   createTeam(@Body() body: CreateTeamDTO) {
      this.repository.saveTeam(body);
      return { message: "Team created" };
   }

   getAllTeams() {
      return this.repository.getAllTeams();
   }
}