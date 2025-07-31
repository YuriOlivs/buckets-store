export default class OrderStatusResponseDTO {
   constructor(
      readonly code: number,
      readonly text: string,
      readonly date: Date
   ) {}
}