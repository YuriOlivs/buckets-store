import UserResponseDTO from "./dto/UserResponseDTO";

export default class UserMapper {
   static toDTO(user: any): UserResponseDTO  {
      return new UserResponseDTO(user.id, user.name, user.lastName, user.email);
   }
}