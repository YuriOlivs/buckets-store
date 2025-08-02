import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import UserRepository from "./user.repository";
import UserEntity from "./user.entity";
import { STRINGS } from "src/common/strings/global.strings";
import UserCreateDTO from "./dto/user-create.dto";

@Injectable()
export default class UserService {
   constructor(private repo: UserRepository) { }

   async getAllUsers(): Promise<UserEntity[]> {
      return await this.repo.getAll();
   }

   async getUserById(id: string): Promise<UserEntity> {
      const userFound = await this.repo.getById(id);
      if (!userFound) throw new NotFoundException('User not found');
      return userFound;
   }

   async createUser(dto: UserCreateDTO): Promise<UserEntity> {
      const user = new UserEntity(
         dto.name,
         dto.lastName,
         dto.email,
         dto.password,
         dto.birthDate
      );

      const emailExists = await this.repo.getByEmail(user.email);
      if (emailExists) throw new BadRequestException(STRINGS.alreadyExists('Email'));

      return await this.repo.save(user);
   }

   async updateUser(id: string, userData: Partial<UserEntity>): Promise<UserEntity> {
      const userFound = await this.repo.getById(id);
      if (!userFound) throw new NotFoundException('User not found');

      if (userData.email && userData.email !== userFound.email) {
         const emailExists = await this.repo.getByEmail(userData.email);
         if (emailExists) throw new BadRequestException(STRINGS.alreadyExists('Email'));
      }

      Object.assign(userFound, userData);

      return await this.repo.save(userFound);
   }


   async deleteUser(id: string) {
      const userFound = await this.repo.getById(id);
      if (!userFound) throw new NotFoundException('User not found');

      return await this.repo.remove(userFound);
   }
}