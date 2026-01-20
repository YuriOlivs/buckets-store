import { BadRequestException, Injectable } from '@nestjs/common';
import { STRINGS } from 'src/common/strings/global.strings';
import { CouponEntity } from '../coupon/coupon.entity';
import { CouponService } from '../coupon/coupon.service';
import ProductService from '../product/product.service';
import { StockStatusEnum } from '../stock/enum/stock-status.enum';
import { StockService } from '../stock/stock.service';
import UserService from '../user/user.service';
import CartRepository from './cart.repository';
import { CartItemCreateDTO } from './dto/cart-item/cart-item-create.dto';
import { CartUpdateDTO } from './dto/cart/cart-update.dto';
import { CartItemEntity } from './entities/cart-item.entity';
import CartEntity from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    private repo: CartRepository,
    private userService: UserService,
    private productService: ProductService,
    private couponService: CouponService,
    private stockService: StockService
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

    const stock = await this.stockService.findByProduct(product.id);
    if (stock.status === StockStatusEnum.OUT_OF_STOCK) throw new BadRequestException(STRINGS.outOfStock(product.name));

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

  async removeItem(userId: string, itemId: string): Promise<CartEntity> {
    const user = await this.userService.findById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    const cart = await this.repo.findByUser(user.id);
    if (!cart) throw new BadRequestException(STRINGS.notFound('Cart'));

    const cartItem = cart.cartItems.find((item) => item.id === itemId);
    if (!cartItem) throw new BadRequestException(STRINGS.notFound('Cart item'));

    cart.cartItems = cart.cartItems.filter((item) => item.id !== itemId);
    return await this.repo.save(cart);
  }

  async applyCoupon(userId: string, code: string) {
    const coupon = await this.couponService.findActiveByCode(code);
    const cart = await this.findByUser(userId);
    const isValid = await this.couponService.checkCouponValidity(coupon, cart);

    if (!isValid) throw new BadRequestException(STRINGS.invalidCoupon());
    cart.coupon = coupon;

    return await this.repo.save(cart);
  }

  async removeCoupon(userId: string) {
    const cart = await this.findByUser(userId);
    cart.coupon = null;
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

    return this.repo.clearCart(cartFound);
  }
}
