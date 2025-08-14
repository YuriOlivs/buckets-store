import { PickType } from "@nestjs/mapped-types";
import { CartItemCreateDTO } from "./cart-item-create.dto";

export class CartItemQuantityDTO extends PickType(CartItemCreateDTO, ['quantity']) {}