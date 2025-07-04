import { Injectable } from "@nestjs/common";
import TeamCreateDTO from "./dto/TeamCreateDTO";
import TeamEntity from "./team.entity";

@Injectable()
export class TeamRepository {
   private teams: TeamEntity[] = [];

   saveTeam(team: TeamEntity): TeamEntity {
      this.teams.push(team);
      return team;
   }

   getAllTeams(): TeamEntity[] {
      return this.teams;
   }

   getTeamByName(name: string): boolean {
      const team = this.teams.find(team => team.getName === name);
      if (team) return true;
      return false;
   }
}