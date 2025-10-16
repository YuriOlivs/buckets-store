export default class UserResponseDTO {
   constructor(
      readonly id: string,
      readonly name: string,
      readonly lastName: string,
      readonly email: string,
      readonly role: string
   ) {}
}