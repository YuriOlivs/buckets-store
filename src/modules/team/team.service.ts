import { STRINGS } from "src/common/strings/global.strings";
import TeamEntity from "./team.entity";
import TeamRepository from "./team.repository";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export default class TeamService {
   constructor (private repo: TeamRepository) {}

   async getAllTeams(): Promise<TeamEntity[]> {
      return await this.repo.getAll();
   }

   async getTeamById(id: string): Promise<TeamEntity | null> {
      const teamFound = await this.repo.getById(id);
      if (!teamFound) throw new NotFoundException('Team not found');

      return teamFound;
   }

   async createTeam(team: TeamEntity): Promise<TeamEntity> {
      const nameExists = await this.repo.getByName(team.name);
      if (nameExists) throw new BadRequestException(STRINGS.alreadyExists('Name'));
      
      return await this.repo.save(team);
   }

   async updateTeam(id: string, teamData: Partial<TeamEntity>): Promise<TeamEntity> {
      const teamFound = await this.repo.getById(id);
      if (!teamFound) throw new NotFoundException('Team not found');

      if(teamData.name) {
         const nameExists = await this.repo.getByName(teamData.name);
         if (nameExists) throw new BadRequestException(STRINGS.alreadyExists('Name'));

         if (teamData.name) teamFound.setName(teamData.name);
      }

      if(teamData.city) teamFound.setCity(teamData.city);

      return await this.repo.save(teamFound);
   }

   async deleteTeam(id: string) {
      const teamFound = await this.repo.getById(id);
      if (!teamFound) throw new NotFoundException('Team not found');
      
      return await this.repo.remove(teamFound);
   }
}