import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RoleCreateDTO } from './dto/role-create.dto';
import { RoleUpdateDTO } from './dto/role-update.dto';
import { RolesService } from './roles.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@ApiBearerAuth('access-token')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  create(@Body() dto: RoleCreateDTO) {
    return this.rolesService.create(dto);
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findById(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: RoleUpdateDTO) {
    return this.rolesService.update(id, dto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
