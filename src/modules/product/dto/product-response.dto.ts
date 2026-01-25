import ImageResponseDTO from "src/modules/image/dto/image-response.dto";
import TeamEntity from "src/modules/team/team.entity";

export default class ProductResponseDTO {
   constructor(
      readonly id: string,
      readonly name: string,
      readonly description: string,
      readonly category: string,
      readonly subcategory: string,
      readonly price: number,
      readonly team: TeamEntity,
      readonly images: ImageResponseDTO[]
   ) { }
}