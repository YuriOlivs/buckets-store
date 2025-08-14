import { PartialType } from '@nestjs/mapped-types';
import { CartItemCreateDTO } from './cart-item-create.dto';

export class CartItemUpdateDTO extends PartialType(CartItemCreateDTO) { }
