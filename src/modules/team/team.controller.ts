import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { v4 as uuid } from 'uuid';
import TeamCreateDTO from "./dto/TeamCreate.dto";
import TeamMapper from "./team.mapper";
import TeamEntity from "./team.entity";
import TeamService from "./team.service";
import { STRINGS } from "src/common/strings/global.strings";

@Controller("/teams")
export default class TeamController {
   constructor(private service: TeamService) { }

   @Post()
   async createTeam(@Body() body: TeamCreateDTO) {
      const team = new TeamEntity(
         uuid(),
         body.name,
         body.city
      );

      const teamCreated = await this.service.createTeam(team);
      return { message: STRINGS.entityCreated('Team'), payload: TeamMapper.toDTO(teamCreated) };
   }

   @Get()
   async getAllTeams() {
      const teamEntites = await this.service.getAllTeams();
      return { message: STRINGS.entityFound('Teams'), payload: teamEntites.map(TeamMapper.toDTO) };
   }

   @Put(':id')
   async updateTeam(@Param('id') id: string, @Body() body: Partial<TeamEntity>) {
      const updatedTeam = await this.service.updateTeam(id, body);
      return { message: STRINGS.entityUpdated('Team'), payload: TeamMapper.toDTO(updatedTeam) };
   }

   @Delete()
   async deleteTeam(@Param('id') id: string) {
      await this.service.deleteTeam(id);
      return { message: STRINGS.entityDeleted('Team'), payload: {} };
   }
}