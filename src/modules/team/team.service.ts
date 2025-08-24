import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { STRINGS } from "src/common/strings/global.strings";
import ImageEntity from "../image/image.entity";
import ImageService from "../image/image.service";
import TeamCreateDTO from "./dto/team-create.dto";
import TeamUpdateDTO from "./dto/team-update.dto";
import TeamEntity from "./team.entity";
import TeamRepository from "./team.repository";

@Injectable()
export default class TeamService {
   constructor(
      private repo: TeamRepository,
      private imgService: ImageService
   ) { }

   async findAll(): Promise<TeamEntity[]> {
      return await this.repo.getAll();
   }

   async findById(id: string): Promise<TeamEntity | null> {
      const teamFound = await this.repo.getById(id);
      if (!teamFound) throw new NotFoundException(STRINGS.notFound('Team'));

      return teamFound;
   }

   async create(dto: TeamCreateDTO): Promise<TeamEntity> {
      const logo = new ImageEntity(dto.logo.url, dto.logo.desc)
      const team = new TeamEntity(dto.name, dto.city, logo);

      const nameExists = await this.repo.getByName(team.name);
      if (nameExists) throw new BadRequestException(STRINGS.alreadyExists('Name'));

      const urlExists = await this.imgService.findByUrl(team.logo.url);
      if (urlExists) {
         if (team.logo.description != urlExists.description) urlExists.description = team.logo.description;
         team.logo = urlExists;
      } else {
         const logo = await this.imgService.create(team.logo);
         team.logo = logo as ImageEntity;
      }

      return await this.repo.save(team);
   }

   async update(id: string, teamData: TeamUpdateDTO): Promise<TeamEntity> {
      const teamFound = await this.repo.getById(id);
      if (!teamFound) throw new NotFoundException(STRINGS.notFound('Team'));

      const { name, logo, ...rest } = teamData;

      if (name) {
         const nameExists = await this.repo.getByName(name);
         if (nameExists) throw new BadRequestException(STRINGS.alreadyExists('Name'));
         teamFound.name = name;
      }

      if (logo) {
         const urlExists = await this.imgService.findByUrl(logo.url);
         if (urlExists) {
            if (logo.desc !== urlExists.description) {
               urlExists.description = logo.desc;
            }
            teamFound.logo = urlExists;
         } else {
            const logoEntity = new ImageEntity(logo.url, logo.desc);
            const logoSaved = await this.imgService.create(logoEntity);
            teamFound.logo = logoSaved as ImageEntity;
         }
      }

      Object.assign(teamFound, rest);

      return await this.repo.save(teamFound);
   }


   async delete(id: string) {
      const teamFound = await this.repo.getById(id);
      if (!teamFound) throw new NotFoundException(STRINGS.notFound('Team'));

      return await this.repo.remove(teamFound);
   }
}