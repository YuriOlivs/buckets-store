import ImageResponseDTO from "src/modules/image/dto/image-response.dto";
import TeamEntity from "src/modules/team/team.entity";
import { StockStatusEnum } from "../enum/stock-status.enum";

export default class ProductResponseDTO {
   constructor(
      readonly id: string,
      readonly name: string,
      readonly description: string,
      readonly category: string,
      readonly subcategory: string,
      readonly quantityAvailable: number,
      readonly stockStatus: StockStatusEnum,
      readonly price: number,
      readonly team: TeamEntity,
      readonly images: ImageResponseDTO[]
   ) { }
}