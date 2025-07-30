import { PartialType } from '@nestjs/mapped-types';
import { OrderStatusCreateDTO } from './OrderStatusCreate.dto';

export class OrderStatusUpdateDTO extends PartialType(OrderStatusCreateDTO) { }
