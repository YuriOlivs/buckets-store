import OrderStatusResponseDTO from "src/modules/order-status/dto/order-status-response.dto";
import OrderItemResponseDTO from "src/modules/order/dto/order-item/order-item-response.dto";
import ProductMapper from "src/modules/product/dto/product.mapper";
import { OrderEntity } from "../../entities/order.entity";
import OrderResponseDTO from "./order-response.dto";

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