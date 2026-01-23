import { CacheInterceptor } from "@nestjs/cache-manager";
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { EmptyListToNoContentInterceptor } from "src/common/interceptor/empty-list-to-no-content.interceptor";
import { STRINGS } from "src/common/strings/global.strings";
import { AuthGuard } from "../auth/auth.guard";
import TeamCreateDTO from "./dto/team-create.dto";
import TeamUpdateDTO from "./dto/team-update.dto";
import TeamMapper from "./dto/team.mapper";
import TeamService from "./team.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Teams')
@ApiBearerAuth('access-token')
@Controller("/teams")
export default class TeamController {
   constructor(private service: TeamService) { }

   @Post()
   @UseGuards(AuthGuard)
   async createTeam(@Body() body: TeamCreateDTO) {
      const teamCreated = await this.service.create(body);
      return {
         message: STRINGS.entityCreated('Team'),
         payload: TeamMapper.toDTO(teamCreated)

      };
   }

   @Get()
   @UseInterceptors(CacheInterceptor, EmptyListToNoContentInterceptor)
   async getAllTeams() {
      const teamEntites = await this.service.findAll();
      return teamEntites.map(TeamMapper.toDTO);
   }

   @Put(':id')
   @UseGuards(AuthGuard)
   async updateTeam(@Param('id') id: string, @Body() body: TeamUpdateDTO) {
      const updatedTeam = await this.service.update(id, body);
      return {
         message: STRINGS.entityUpdated('Team'),
         payload: TeamMapper.toDTO(updatedTeam)

      };
   }

   @Delete()
   @UseGuards(AuthGuard)
   async deleteTeam(@Param('id') id: string) {
      await this.service.delete(id);
      return {
         message: STRINGS.entityDeleted('Team'),
         payload: {}
      };
   }
}