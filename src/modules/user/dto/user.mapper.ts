import UserEntity from "../user.entity";
import UserResponseDTO from "./UserResponse.dto";

export default class UserMapper {
   static toDTO(user: UserEntity): UserResponseDTO {
      return new UserResponseDTO(user.id, user.name, user.lastName, user.email);
   }
}