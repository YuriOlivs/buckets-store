import { PartialType } from '@nestjs/mapped-types';
import { CartCreateDTO } from './cart-create.dto';

export class CartUpdateDTO extends PartialType(CartCreateDTO) { }
