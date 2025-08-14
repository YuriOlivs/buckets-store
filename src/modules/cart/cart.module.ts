import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import CartRepository from './cart.repository';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [CartController],
  providers: [CartService, CartRepository],
  imports: [UserModule],
})
export class CartModule { }
