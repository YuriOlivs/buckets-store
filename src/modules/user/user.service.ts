import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import UserRepository from "./user.repository";
import UserEntity from "./user.entity";
import { STRINGS } from "src/common/strings/global.strings";
import UserCreateDTO from "./dto/UserCreate.dto";

@Injectable()
export default class UserService {
   constructor(private repo: UserRepository) {}

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

      if (userData.email) {
         const emailExists = await this.repo.getByEmail(userData.email);
         if (emailExists) throw new BadRequestException(STRINGS.alreadyExists('Email'));

         userFound.setEmail(userData.email);
      }

      if (userData.name) userFound.setName(userData.name);
      if (userData.lastName) userFound.setLastName(userData.lastName);
      if (userData.password) userFound.setPassword(userData.password);
      if (userData.birthDate) userFound.setBirthDate(userData.birthDate);

      return await this.repo.save(userFound);
   }

   async deleteUser(id: string) {
      const userFound = await this.repo.getById(id);
      if (!userFound) throw new NotFoundException('User not found');
      
      return await this.repo.remove(userFound);
   }
}