import UserEntity from "../user.entity";
import UserResponseDTO from "./user-response.dto";

export default class UserMapper {
   static toDTO(user: UserEntity): UserResponseDTO {
      return new UserResponseDTO(user.id, user.name, user.lastName, user.email, user.role.name);
   }
}