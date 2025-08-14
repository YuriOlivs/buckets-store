import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartUpdateDTO } from './dto/cart/cart-update.dto';
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get('id')
  findByUser(@Param('id') id: string) {
    return this.cartService.findByUser(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: CartUpdateDTO) {
    return this.cartService.update(id, dto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(id);
  }
}
