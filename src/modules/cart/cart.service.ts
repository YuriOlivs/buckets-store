import { BadRequestException, Injectable } from '@nestjs/common';
import { STRINGS } from 'src/common/strings/global.strings';
import ProductService from '../product/product.service';
import UserService from '../user/user.service';
import CartRepository from './cart.repository';
import { CartItemCreateDTO } from './dto/cart-item/cart-item-create.dto';
import { CartUpdateDTO } from './dto/cart/cart-update.dto';
import { CartItemEntity } from './entities/cart-item.entity';
import CartEntity from './entities/cart.entity';
import { CouponService } from '../coupon/coupon.service';

@Injectable()
export class CartService {
  constructor(
    private repo: CartRepository,
    private userService: UserService,
    private productService: ProductService,
    private couponService: CouponService
  ) { }

  async findOrCreate(userId: string): Promise<CartEntity> {
    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    const cartFound = await this.repo.findByUser(user.id);
    if (!cartFound) {
      const cart = new CartEntity(user);
      return await this.repo.save(cart);
    }

    return cartFound;
  }

  async addItem(userId: string, dto: CartItemCreateDTO): Promise<CartEntity> {
    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    const product = await this.productService.findById(dto.product);
    if (!product) throw new BadRequestException(STRINGS.notFound('Product'));

    const cart = await this.findOrCreate(user.id);

    const cartItem = new CartItemEntity(
      product,
      dto.quantity,
      product.price,
      cart
    );

    cart.cartItems = [cartItem];
    return await this.repo.save(cart);
  }
  
  async applyCoupon(cartId: string, code: string) {
    const coupon = await this.couponService.findActiveByCode(code);
    const cart = await this.findById(cartId);

    cart.coupon = coupon;
    return await this.repo.save(cart);
  }

  async findByUser(userId: string): Promise<CartEntity> {
    const cartFound = await this.repo.findByUser(userId);
    if (!cartFound) throw new BadRequestException(STRINGS.notFound('Cart'));

    return cartFound;
  }

  async findById(id: string): Promise<CartEntity> {
    const cartFound = await this.repo.findById(id);
    if (!cartFound) throw new BadRequestException(STRINGS.notFound('Cart'));

    return cartFound;
  }

  async update(userId: string, dto: CartUpdateDTO) {
    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    const cartFound = await this.repo.findByUser(userId);
    if (!cartFound) throw new BadRequestException(STRINGS.notFound('Cart'));

    Object.assign(cartFound, dto);
    return await this.repo.save(cartFound);
  }

  async adjustQuantity(userId: string, itemId: string, quantity: number) {
    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    const cartFound = await this.repo.findByUser(userId);
    if (!cartFound) throw new BadRequestException(STRINGS.notFound('Cart'));

    const cartItemFound = cartFound.cartItems.find(item => item.id === itemId);
    if (!cartItemFound) throw new BadRequestException(STRINGS.notFound('Cart item'));

    if (cartItemFound.quantity === quantity) return cartItemFound;
    cartItemFound.quantity = quantity;

    return await this.repo.saveItem(cartItemFound);
  }

  async remove(id: string) {
    const cart = await this.repo.findById(id);
    if (!cart) throw new BadRequestException(STRINGS.notFound('Cart'));

    return this.repo.remove(cart);
  }

  async clear(userId: string) {
    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    const cartFound = await this.repo.findByUser(userId);
    if (!cartFound) throw new BadRequestException(STRINGS.notFound('Cart'));

    return this.repo.clearCart(cartFound.id);
  }
}
