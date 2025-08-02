import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import AddressRepository from './address.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './address.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AddressEntity]),
    UserModule
  ],
  exports: [AddressService],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
})
export class AddressModule {}
