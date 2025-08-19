import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressCreateDTO } from './dto/address-create.dto';
import { AdressUpdateDTO } from './dto/address-update.dto';
import AddressRepository from './address.repository';
import { AddressEntity } from './address.entity';
import UserService from '../user/user.service';
import { STRINGS } from 'src/common/strings/global.strings';

@Injectable()
export class AddressService {
  constructor(
    private repo: AddressRepository,
    private userService: UserService
  ) {}
  async create(dto: AddressCreateDTO) {
    const user = await this.userService.getUserById(dto.user);
    if(!user) throw new NotFoundException(STRINGS.notFound('User'));

    const address = new AddressEntity(
      dto.street,
      dto.number,
      dto.city,
      dto.state,
      dto.complement,
      dto.neighborhood,
      dto.postalCode,
      dto.country,
      user
    );

    return await this.repo.save(address);
  }

  async findByUser(id: string) {
    const addressFound = await this.repo.findByUser(id);
    if(!addressFound) throw new NotFoundException(STRINGS.notFound('Address'));

    return addressFound;
  }

  async findById(id: string) {
    const addressFound = await this.repo.findById(id);
    if(!addressFound) throw new NotFoundException(STRINGS.notFound('Address'));
    
    return addressFound;
  }

  async update(id: string, dto: AdressUpdateDTO) {
    const address = await this.repo.findById(id);
    if(!address) throw new NotFoundException(STRINGS.notFound('Address'));

    Object.assign(address, dto);
    return await this.repo.save(address);
  }

  async remove(id: string) {
    const address = await this.repo.findById(id);
    if(!address) throw new NotFoundException(STRINGS.notFound('Address'));

    return await this.repo.remove(address);
  }
}
