import OrderStatusResponseDTO from "src/modules/order-status/dto/order-status-response.dto";
import OrderItemResponseDTO from "src/modules/order/dto/order-item/order-item-response.dto";

export default class OrderResponseDTO {
   constructor(
      readonly id: string,
      readonly totalValue: number,
      readonly status: OrderStatusResponseDTO,
      readonly items: OrderItemResponseDTO[],
   ) { }
}