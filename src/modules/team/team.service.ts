import { STRINGS } from "src/common/strings/global.strings";
import TeamEntity from "./team.entity";
import TeamRepository from "./team.repository";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import ImageService from "../image/image.service";
import ImageEntity from "../image/image.entity";
import TeamCreateDTO from "./dto/TeamCreate.dto";
import TeamUpdateDTO from "./dto/TeamUpdate.dto";

@Injectable()
export default class TeamService {
   constructor(
      private repo: TeamRepository,
      private imgService: ImageService
   ) { }

   async getAllTeams(): Promise<TeamEntity[]> {
      return await this.repo.getAll();
   }

   async getTeamById(id: string): Promise<TeamEntity | null> {
      const teamFound = await this.repo.getById(id);
      if (!teamFound) throw new NotFoundException('Team not found');

      return teamFound;
   }

   async createTeam(dto: TeamCreateDTO): Promise<TeamEntity> {
      const logo = new ImageEntity(dto.logo.url, dto.logo.desc)
      const team = new TeamEntity(dto.name, dto.city, logo);

      const nameExists = await this.repo.getByName(team.name);
      if (nameExists) throw new BadRequestException(STRINGS.alreadyExists('Name'));

      const urlExists = await this.imgService.getImageByUrl(team.logo.url);
      if (urlExists) {
         if (team.logo.description != urlExists.description) urlExists.description = team.logo.description;
         team.logo = urlExists;
      } else {
         const logo = await this.imgService.createImage(team.logo);
         team.logo = logo as ImageEntity;
      }

      return await this.repo.save(team);
   }

   async updateTeam(id: string, teamData: TeamUpdateDTO): Promise<TeamEntity> {
      const teamFound = await this.repo.getById(id);
      if (!teamFound) throw new NotFoundException('Team not found');

      const { name, logo, ...rest } = teamData;

      if (name) {
         const nameExists = await this.repo.getByName(name);
         if (nameExists) throw new BadRequestException(STRINGS.alreadyExists('Name'));
         teamFound.name = name;
      }

      if (logo) {
         const urlExists = await this.imgService.getImageByUrl(logo.url);
         if (urlExists) {
            if (logo.desc !== urlExists.description) {
               urlExists.description = logo.desc;
            }
            teamFound.logo = urlExists;
         } else {
            const logoEntity = new ImageEntity(logo.url, logo.desc);
            const logoSaved = await this.imgService.createImage(logoEntity);
            teamFound.logo = logoSaved as ImageEntity;
         }
      }

      Object.assign(teamFound, rest);

      return await this.repo.save(teamFound);
   }


   async deleteTeam(id: string) {
      const teamFound = await this.repo.getById(id);
      if (!teamFound) throw new NotFoundException('Team not found');

      return await this.repo.remove(teamFound);
   }
}