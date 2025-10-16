import { Injectable, NotFoundException } from '@nestjs/common';
import { RoleCreateDTO } from './dto/role-create.dto';
import { RoleUpdateDTO } from './dto/role-update.dto';
import RoleRepository from './role.repository';
import { RoleEntity } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    private readonly repo: RoleRepository
  ) { }

  async create(dto: RoleCreateDTO): Promise<RoleEntity> {
    const role = new RoleEntity(dto.name, dto.description);

    return await this.repo.save(role);
  }

  async findAll(): Promise<RoleEntity[]> {
    return await this.repo.findAll();
  }

  async findById(id: string): Promise<RoleEntity> {
    const role = await this.repo.findById(id);
    if(!role) throw new NotFoundException('Role not found');

    return role;
  }

  async findByName(name: string): Promise<RoleEntity> {
    const role = await this.repo.findByName(name);
    if(!role) throw new NotFoundException('Role not found');

    return role;
  }

  async findDefault(): Promise<RoleEntity> {
    const role = await this.repo.findByName('CUSTOMER');
    if(!role) throw new NotFoundException('Role not found');

    return role;
  }

  async update(id: string, dto: RoleUpdateDTO): Promise<RoleEntity> {
    const role = await this.findById(id);
    Object.assign(role, dto);
    return await this.repo.save(role);
  }

  async remove(id: string) {
    const role = await this.findById(id);
    return await this.repo.remove(role);
  }
}
