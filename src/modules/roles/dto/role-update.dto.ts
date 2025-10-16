import { PartialType } from '@nestjs/mapped-types';
import { RoleCreateDTO } from './role-create.dto';

export class RoleUpdateDTO extends PartialType(RoleCreateDTO) { }
