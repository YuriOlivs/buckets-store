import TeamResponseDTO from "./dto/TeamResponse.dto";
import TeamEntity from "./team.entity";

export default class TeamMapper {
   static toDTO(team: TeamEntity): TeamResponseDTO {
      return new TeamResponseDTO(team.getId, `${team.getCity} ${team.getName}`);
   }
}