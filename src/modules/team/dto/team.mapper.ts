import TeamResponseDTO from "./team-response.dto";
import TeamEntity from "../team.entity";
import ImageMapper from "src/modules/image/dto/image.mapper.dto";

export default class TeamMapper {
   static toDTO(team: TeamEntity): TeamResponseDTO {
      return new TeamResponseDTO(
         team.id, 
         `${team.city} ${team.name}`,
         ImageMapper.toDTO(team.logo)
      );
   }
}