import ImageCreateDTO from "../../image/dto/ImageCreate.dto";

export default class ProductResponseDTO {
   constructor(
      readonly id: string,
      readonly name: string,
      readonly description: string,
      readonly category: string,
      readonly subcategory: string,
      readonly price: number,
      readonly team: string,
      readonly images: ImageCreateDTO[]
   ) { }
}