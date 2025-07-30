export default class ProductOrderItemDTO {
   constructor(
      readonly id: string,
      readonly price: number,
      readonly quantity: number,
   ) { }
}