import { PartialType } from "@nestjs/mapped-types";
import TeamCreateDTO from "./TeamCreate.dto";

export default class TeamUpdateDTO extends PartialType(TeamCreateDTO) {}