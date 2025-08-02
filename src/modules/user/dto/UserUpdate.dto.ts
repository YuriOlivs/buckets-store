import UserCreateDTO from "./UserCreate.dto";
import { PartialType } from "@nestjs/mapped-types";

export default class UserUpdateDTO extends PartialType(UserCreateDTO) {}