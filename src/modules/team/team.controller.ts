import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import TeamCreateDTO from "./dto/team-create.dto";
import TeamMapper from "./dto/team.mapper";
import TeamService from "./team.service";
import { STRINGS } from "src/common/strings/global.strings";
import TeamUpdateDTO from "./dto/team-update.dto";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { EmptyListToNoContentInterceptor } from "src/common/interceptor/empty-list-to-no-content.interceptor";
import { AuthGuard } from "../auth/auth.guard";

@Controller("/teams")
export default class TeamController {
   constructor(private service: TeamService) { }

   @Post()
   @UseGuards(AuthGuard)
   async createTeam(@Body() body: TeamCreateDTO) {
      const teamCreated = await this.service.createTeam(body);
      return { 
         message: STRINGS.entityCreated('Team'), 
         payload: TeamMapper.toDTO(teamCreated) 
         
      };
   }

   @Get()
   @UseInterceptors(CacheInterceptor, EmptyListToNoContentInterceptor)
   async getAllTeams() {
      const teamEntites = await this.service.getAllTeams();
      return teamEntites.map(TeamMapper.toDTO);
   }

   @Put(':id')
   @UseGuards(AuthGuard)
   async updateTeam(@Param('id') id: string, @Body() body: TeamUpdateDTO) {
      const updatedTeam = await this.service.updateTeam(id, body);
      return { 
         message: STRINGS.entityUpdated('Team'), 
         payload: TeamMapper.toDTO(updatedTeam) 
         
      };
   }

   @Delete()
   @UseGuards(AuthGuard)
   async deleteTeam(@Param('id') id: string) {
      await this.service.deleteTeam(id);
      return { 
         message: STRINGS.entityDeleted('Team'), 
         payload: {} 
   };
   }
}