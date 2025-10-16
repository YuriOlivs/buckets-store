import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import RoleRepository from './role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  controllers: [RolesController],
  providers: [RolesService, RoleRepository],
  exports: [RolesService]
})
export class RolesModule {}
