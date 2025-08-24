import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { STRINGS } from "src/common/strings/global.strings";
import UserCreateDTO from "./dto/user-create.dto";
import UserEntity from "./user.entity";
import UserRepository from "./user.repository";

@Injectable()
export default class UserService {
   constructor(private repo: UserRepository) { }

   async findAll(): Promise<UserEntity[]> {
      return await this.repo.getAll();
   }

   async findById(id: string): Promise<UserEntity> {
      const userFound = await this.repo.getById(id);
      if (!userFound) throw new NotFoundException('User not found');
      return userFound;
   }

   async findByEmail(email: string): Promise<UserEntity | null> {
      return await this.repo.getByEmail(email);
   }

   async create(dto: UserCreateDTO): Promise<UserEntity> {
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

   async update(id: string, userData: Partial<UserEntity>): Promise<UserEntity> {
      const userFound = await this.repo.getById(id);
      if (!userFound) throw new NotFoundException('User not found');

      if (userData.email && userData.email !== userFound.email) {
         const emailExists = await this.repo.getByEmail(userData.email);
         if (emailExists) throw new BadRequestException(STRINGS.alreadyExists('Email'));
      }

      Object.assign(userFound, userData);

      return await this.repo.save(userFound);
   }


   async delete(id: string) {
      const userFound = await this.repo.getById(id);
      if (!userFound) throw new NotFoundException('User not found');

      return await this.repo.remove(userFound);
   }
}