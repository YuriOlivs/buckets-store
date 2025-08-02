import { PartialType } from '@nestjs/mapped-types';
import { AddressCreateDTO } from './address-create.dto';

export class AdressUpdateDTO extends PartialType(AddressCreateDTO) { }
