import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserEntity from './user.entity';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  async getById(id: string): Promise<UserEntity | null> {
    return await this.repository.findOne({ where: { id: id } });
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    return await this.repository.findOne({ where: { email } });;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    return this.repository.save(user);
  }

  async remove(user: UserEntity): Promise<UserEntity> {
    return await this.repository.softRemove(user);
  }
}
