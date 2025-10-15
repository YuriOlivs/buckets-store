import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItemCreateDTO } from './dto/cart-item/cart-item-create.dto';
import { CartItemQuantityDTO } from './dto/cart-item/cart-item-quantity.dto';
import CartMapper from './dto/cart/cart.mapper';
import { AuthGuard } from '../auth/auth.guard';
import RequestWithUser from '../auth/dto/req-with-user.dto';
@UseGuards(AuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post('/add-item')
  async addItemToCart(
    @Req() req: RequestWithUser,
    @Body() dto: CartItemCreateDTO
  ) {
    const userId = req.user.sub;

    const cartUpdated = await this.cartService.addItem(userId, dto);
    return {
      message: `Item added to cart successfully`,
      payload: CartMapper.toDTO(cartUpdated)
    }
  }

  @Patch('/remove-item/:item_id')
  async removeItemFromCart(
    @Req() req: RequestWithUser,
     @Param('item_id') itemId: string
    ) {
    const userId = req.user.sub;

    const cartUpdated = await this.cartService.removeItem(userId, itemId);
    return CartMapper.toDTO(cartUpdated);
  }

  @Patch('/apply-coupon')
  async applyCoupon(
    @Req() req: RequestWithUser,
    @Body() dto: { code: string }
  ) {
    const userId = req.user.sub;

    const cartUpdated = await this.cartService.applyCoupon(userId, dto.code);
    return CartMapper.toDTO(cartUpdated);  
  }

  @Get()
  async findByUser(@Req() req: RequestWithUser) {
    const userId = req.user.sub;

    const cartFound = await this.cartService.findByUser(userId);
    return CartMapper.toDTO(cartFound);
  }

  @Patch('/adjust-quantity/:item_id')
  async update(
    @Req() req: RequestWithUser,
    @Param('item_id') itemId: string,
    @Body() dto: CartItemQuantityDTO
  ) {
    const userId = req.user.sub;

    const cartUpdated = await this.cartService.adjustQuantity(userId, itemId, dto.quantity);
    return CartMapper.itemToDTO(cartUpdated);
  }

  @Delete('/clear-cart')
  async clearCart(
    @Req() req: RequestWithUser
  ) {
    const userId = req.user.sub;
    await this.cartService.clear(userId);

    return { message: 'Cart cleared successfully' };
  }
}
