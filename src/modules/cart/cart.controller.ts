import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemCreateDTO } from './dto/cart-item/cart-item-create.dto';
import { CartItemQuantityDTO } from './dto/cart-item/cart-item-quantity.dto';
import CartMapper from './dto/cart/cart.mapper';
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('/add-item/:user_id')
  async addItemToCart(
    @Param('user_id') userId: string,
    @Body() dto: CartItemCreateDTO
  ) {
    const cartUpdated = await this.cartService.addItemToCart(userId, dto);
    return {
      message: `Item added to cart successfully`,
      payload: CartMapper.toDTO(cartUpdated)
    }
  }

  @Get('/:user_id')
  async findByUser(@Param('user_id') userId: string) {
    const cartFound = await this.cartService.findByUser(userId);
    return CartMapper.toDTO(cartFound);
  }

  @Patch('/adjust-quantity/:user_id/:item_id')
  async update(
    @Param('user_id') userId: string,
    @Param('item_id') itemId: string,
    @Body() dto: CartItemQuantityDTO
  ) {
    const cartUpdated = await this.cartService.adjustQuantity(userId, itemId, dto.quantity);
    return CartMapper.itemToDTO(cartUpdated);
  }

  @Delete('/clear-cart/:user_id')
  async clearCart(@Param('user_id') userId: string) {
    return await this.cartService.clearCart(userId);
  }
}
