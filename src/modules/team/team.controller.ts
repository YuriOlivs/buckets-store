import { Body, Controller } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import { TeamRepository } from "./team.repository";
import TeamCreateDTO from "./dto/TeamCreate.dto";
import TeamMapper from "./team.mapper";
import TeamEntity from "./team.entity";

@Controller("/team")
export default class TeamController {
   constructor(private repository: TeamRepository) { }

   createTeam(@Body() body: TeamCreateDTO) {
      const team = new TeamEntity(
         uuid(),
         body.name,
         body.city
      );

      const teamCreated = this.repository.saveTeam(team);
      return { message: "Team created", payload: TeamMapper.toDTO(teamCreated) };
   }

   getAllTeams() {
      const teamEntites = this.repository.getAllTeams();
      return teamEntites.map(TeamMapper.toDTO);
   }
}