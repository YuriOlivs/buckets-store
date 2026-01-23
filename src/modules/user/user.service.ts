import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { STRINGS } from "src/common/strings/global.strings";
import UserCreateDTO from "./dto/user-create.dto";
import UserEntity from "./user.entity";
import UserRepository from "./user.repository";
import { RolesService } from "../roles/roles.service";
import { RoleEntity } from "../roles/role.entity";
import UserUpdateDTO from "./dto/user-update.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UserCreatedEvent } from "./events/user-created.event";

@Injectable()
export default class UserService {
   constructor(
      private repo: UserRepository,
      private rolesService: RolesService,
      private readonly eventEmitter: EventEmitter2
   ) { }

   async findAll(): Promise<UserEntity[]> {
      return await this.repo.findAll();
   }

   async findById(id: string): Promise<UserEntity> {
      const userFound = await this.repo.findById(id);
      if (!userFound) throw new NotFoundException('User not found');
      return userFound;
   }

   async findByEmail(email: string): Promise<UserEntity | null> {
      return await this.repo.findByEmail(email);
   }

   async create(dto: UserCreateDTO): Promise<UserEntity> {
      let userRole: RoleEntity;
      if (dto.role) {
         userRole = await this.rolesService.findByName(dto.role);
      } else {
         userRole = await this.rolesService.findDefault();
      }

      const user = new UserEntity(
         dto.name,
         dto.lastName,
         dto.email,
         dto.password,
         dto.birthDate,
         userRole
      );

      const emailExists = await this.repo.findByEmail(user.email);
      if (emailExists) throw new BadRequestException(STRINGS.alreadyExists('Email'));

      const createdUser = await this.repo.save(user);

      this.eventEmitter.emit(
         'user.created',
         new UserCreatedEvent(createdUser)
      )

      return createdUser;
   }

   async update(id: string, userData: UserUpdateDTO): Promise<UserEntity> {
      const userFound = await this.findById(id);

      if (userData.email && userData.email !== userFound.email) {
         const emailExists = await this.repo.findByEmail(userData.email);
         if (emailExists) throw new BadRequestException(STRINGS.alreadyExists('Email'));
      }

      Object.assign(userFound, userData);

      return await this.repo.save(userFound);
   }

   async updateRole(userId: string, role: string): Promise<UserEntity> {
      const userFound = await this.findById(userId);
      const roleFound = await this.rolesService.findByName(role);

      userFound.role = roleFound;
      return await this.repo.save(userFound);
   }

   async delete(id: string) {
      const userFound = await this.findById(id);
      return await this.repo.remove(userFound);
   }
}