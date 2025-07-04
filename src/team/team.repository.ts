import { Injectable } from "@nestjs/common";
import CreateTeamDTO from "./dto/CreateTeamDTO";

@Injectable()
export class TeamRepository {
   private teams: CreateTeamDTO[] = [];

   saveTeam(team: CreateTeamDTO): CreateTeamDTO {
      this.teams.push(team);
      return team;
   }

   getAllTeams(): CreateTeamDTO[] {
      return this.teams;
   }

   getTeamByName(name: string): boolean {
      const team = this.teams.find(team => team.name === name);
      if(team) return true;
      return false;
   }
}