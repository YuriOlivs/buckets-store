import OrderItemResponseDTO from "src/modules/order-item/dto/OrderItemResponse.dto";
import OrderStatusResponseDTO from "src/modules/order-status/dto/OrderStatusResponse.dto";

export default class OrderResponseDTO {
   constructor(
      readonly id: string,
      readonly totalValue: number,
      readonly status: OrderStatusResponseDTO,
      readonly items: OrderItemResponseDTO[],
   ) {}
}