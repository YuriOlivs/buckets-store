import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressCreateDTO } from './dto/address-create.dto';
import { AdressUpdateDTO } from './dto/address-update.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  async create(@Body() createAddressDto: AddressCreateDTO) {
    return await this.addressService.create(createAddressDto);
  }

  @Get('/by-user/:id')
  async findByUser(@Param('id') id: string) {
    return await this.addressService.findByUser(id);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.addressService.findById(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateAddressDto: AdressUpdateDTO) {
    return await this.addressService.update(id, updateAddressDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.addressService.remove(id);
  }
}
