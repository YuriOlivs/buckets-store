import OrderStatusResponseDTO from "src/modules/order-status/dto/order-status-response.dto";
import { OrderEntity } from "../order.entity";
import OrderResponseDTO from "./order-response.dto";
import OrderItemResponseDTO from "src/modules/order-item/dto/order-item-response.dto";
import ProductMapper from "src/modules/product/dto/product.mapper";

export default class OrderMapper {
   static toDTO(entity: OrderEntity) {
      const status = new OrderStatusResponseDTO(
         entity.orderStatus.statusCode,
         entity.orderStatus.statusText,
         entity.orderStatus.statusDate
      );

      const items = entity.orderItems.map(item => {
         return new OrderItemResponseDTO(
            item.quantity,
            ProductMapper.toDTO(item.product)
         )
      });

      const order = new OrderResponseDTO(
         entity.id,
         Math.floor(entity.totalValue * 100) / 100,
         status,
         items
      );

      return order;
   }
}