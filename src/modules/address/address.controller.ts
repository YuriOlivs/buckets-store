import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressCreateDTO } from './dto/address-create.dto';
import { AdressUpdateDTO } from './dto/address-update.dto';
import { STRINGS } from 'src/common/strings/global.strings';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { EmptyListToNoContentInterceptor } from 'src/common/interceptor/empty-list-to-no-content.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import RequestWithUser from '../auth/dto/req-with-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  async create(@Body() dto: AddressCreateDTO) {
    const address = await this.addressService.create(dto);
    return {
      message: STRINGS.entityCreated('Address'),
      payload: address
    }
  }

  @Get('/by-user')
  @UseInterceptors(CacheInterceptor, EmptyListToNoContentInterceptor)
  async findByUser(
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.sub;
    return await this.addressService.findByUser(userId);
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async findById(@Param('id') id: string) {
    return await this.addressService.findById(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateAddressDto: AdressUpdateDTO) {
    const address = await this.addressService.update(id, updateAddressDto);
    return {
      message: STRINGS.entityUpdated('Address'),
      payload: address
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const address = await this.addressService.remove(id);
    return {
      message: STRINGS.entityDeleted('Address'),
      payload: address
    }
  }
}
