import ImageResponseDTO from "src/modules/image/dto/image-response.dto";

export default class TeamResponseDTO {
   constructor(
      readonly id: string,
      readonly name: string,
      readonly logo: ImageResponseDTO
   ) { }
}