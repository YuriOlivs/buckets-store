import { Injectable } from "@nestjs/common";
import TeamCreateDTO from "./dto/TeamCreate.dto";
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

   getTeamById(id: string): TeamEntity {
      const team = this.teams.find(team => team.getId === id);
      if (!team) throw new Error('Team not found');
      return team;
   }

   getTeamByName(name: string): boolean {
      const team = this.teams.find(team => team.getName === name);
      if (team) return true;
      return false;
   }

   updateTeam(id: string, teamData: Partial<TeamEntity>): TeamEntity {
      const team = this.teams.find(team => team.getId === id);
      if (!team) throw new Error('Team not found');

      if (teamData.getName) team.setName(teamData.getName);
      if (teamData.getCity) team.setCity(teamData.getCity);

      return team;
   }

   removeTeam(id: string) {
      const team = this.teams.find(team => team.getId === id);
      if (!team) throw new Error('Team not found');
      this.teams = this.teams.filter(team => team.getId !== id);
      return team;
   }
}