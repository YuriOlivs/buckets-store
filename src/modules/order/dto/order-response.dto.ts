import OrderItemResponseDTO from "src/modules/order-item/dto/order-item-response.dto";
import OrderStatusResponseDTO from "src/modules/order-status/dto/order-status-response.dto";

export default class OrderResponseDTO {
   constructor(
      readonly id: string,
      readonly totalValue: number,
      readonly status: OrderStatusResponseDTO,
      readonly items: OrderItemResponseDTO[],
   ) { }
}