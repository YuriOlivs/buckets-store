import { STRINGS } from "src/common/strings/global.strings";
import TeamEntity from "./team.entity";
import TeamRepository from "./team.repository";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import ImageService from "../image/image.service";
import ImageEntity from "../image/image.entity";

@Injectable()
export default class TeamService {
   constructor (
      private repo: TeamRepository,
      private imgService: ImageService
   ) {}

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

      const urlExists = await this.imgService.getImageByUrl(team.logo.url);
      if (urlExists) {
         if(team.logo.description != urlExists.description) urlExists.description = team.logo.description;
         team.setLogo(urlExists);
      } else {
         const logo = await this.imgService.createImage(team.logo);
         team.setLogo(logo as ImageEntity);
      }
      
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

      if(teamData.logo) {
         const urlExists = await this.imgService.getImageByUrl(teamData.logo.url);
         if (urlExists) {
            if(teamData.logo.description != urlExists.description) urlExists.description = teamData.logo.description;
            teamFound.setLogo(urlExists);
         } else {
            const logo = await this.imgService.createImage(teamData.logo);
            teamFound.setLogo(logo as ImageEntity);
         }
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