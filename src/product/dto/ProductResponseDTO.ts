import ImageDTO from "./ImageDTO";

export default class ProductResponseDTO {
   constructor(
      readonly id: string,
      readonly name: string,
      readonly description: string,
      readonly category: string,
      readonly subcategory: string,
      readonly price: number,
      readonly team: string,
      readonly images: ImageDTO[]
   ) {}
}