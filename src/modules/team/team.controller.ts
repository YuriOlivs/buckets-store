import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import TeamCreateDTO from "./dto/team-create.dto";
import TeamMapper from "./dto/team.mapper";
import TeamEntity from "./team.entity";
import TeamService from "./team.service";
import { STRINGS } from "src/common/strings/global.strings";
import ImageEntity from "../image/image.entity";
import TeamUpdateDTO from "./dto/team-update.dto";

@Controller("/teams")
export default class TeamController {
   constructor(private service: TeamService) { }

   @Post()
   async createTeam(@Body() body: TeamCreateDTO) {
      const teamCreated = await this.service.createTeam(body);
      return { message: STRINGS.entityCreated('Team'), payload: TeamMapper.toDTO(teamCreated) };
   }

   @Get()
   async getAllTeams() {
      const teamEntites = await this.service.getAllTeams();
      return teamEntites.map(TeamMapper.toDTO);
   }

   @Put(':id')
   async updateTeam(@Param('id') id: string, @Body() body: TeamUpdateDTO) {
      const updatedTeam = await this.service.updateTeam(id, body);
      return { message: STRINGS.entityUpdated('Team'), payload: TeamMapper.toDTO(updatedTeam) };
   }

   @Delete()
   async deleteTeam(@Param('id') id: string) {
      await this.service.deleteTeam(id);
      return { message: STRINGS.entityDeleted('Team'), payload: {} };
   }
}