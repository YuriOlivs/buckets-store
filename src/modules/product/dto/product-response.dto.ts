import ImageResponseDTO from "src/modules/image/dto/image-response.dto";
import TeamEntity from "src/modules/team/team.entity";
import { StockStatusEnum } from "../../stock/enum/stock-status.enum";
import StockResponseDTO from "src/modules/stock/dto/stock-response.dto";

export default class ProductResponseDTO {
   constructor(
      readonly id: string,
      readonly name: string,
      readonly description: string,
      readonly category: string,
      readonly subcategory: string,
      readonly price: number,
      readonly team: TeamEntity,
      readonly images: ImageResponseDTO[],
      readonly stock: Pick<StockResponseDTO, 'status'>
   ) { }
}