import { PartialType } from "@nestjs/mapped-types";
import TeamCreateDTO from "./team-create.dto";

export default class TeamUpdateDTO extends PartialType(TeamCreateDTO) { }