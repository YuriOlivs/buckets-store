import { IsArray } from "class-validator";
import { StockUpdateDTO } from "./stock-update-dto";

export default class StockUpdateListDTO {
   @IsArray()
   items: StockUpdateDTO[];
}