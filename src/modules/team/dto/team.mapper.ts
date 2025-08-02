import TeamResponseDTO from "./team-response.dto";
import TeamEntity from "../team.entity";
import ImageMapper from "src/modules/image/dto/image.mapper.dto";

export default class TeamMapper {
   static toDTO(team: TeamEntity): TeamResponseDTO {
      return new TeamResponseDTO(
         team.getId, 
         `${team.getCity} ${team.getName}`,
         ImageMapper.toDTO(team.getLogo)
      );
   }
}