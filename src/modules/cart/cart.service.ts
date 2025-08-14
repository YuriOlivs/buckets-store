import { BadRequestException, Injectable } from '@nestjs/common';
import { CartUpdateDTO } from './dto/cart/cart-update.dto';
import CartRepository from './cart.repository';
import UserService from '../user/user.service';
import { STRINGS } from 'src/common/strings/global.strings';
import CartEntity from './entities/cart.entity';
import { CartItemCreateDTO } from './dto/cart-item/cart-item-create.dto';
import { CartItemEntity } from './entities/cart-item.entity';
import ProductService from '../product/product.service';
import { CartItemQuantityDTO } from './dto/cart-item/cart-item-quantity.dto';

@Injectable()
export class CartService {
  constructor(
    private repo: CartRepository,
    private userService: UserService,
    private productService: ProductService
  ) { }

  async findOrCreateCart(userId: string): Promise<CartEntity> {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    const cartFound = await this.repo.findByUser(user.id);
    if (!cartFound) {
      const cart = new CartEntity(user);
      return await this.repo.save(cart);
    }

    return cartFound;
  }

  async addItemToCart(userId: string, dto: CartItemCreateDTO) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    console.log('------------------------')
    console.log(dto)
    const product = await this.productService.getProductById(dto.product);
    if (!product) throw new BadRequestException(STRINGS.notFound('Product'));

    const cart = await this.findOrCreateCart(user.id);

    const cartItem = new CartItemEntity(
      product, 
      dto.quantity, 
      product.price, 
      cart
    );

    cart.cartItems.push(cartItem);
    cart.totalValue += cartItem.salePrice * cartItem.quantity;

    return await this.repo.save(cart);
  }

  async findByUser(userId: string): Promise<CartEntity | null> {
    return await this.repo.findByUser(userId);
  }

  async update(userId: string, dto: CartUpdateDTO) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    const cartFound = await this.repo.findByUser(userId);
    if (!cartFound) throw new BadRequestException(STRINGS.notFound('Cart'));

    Object.assign(cartFound, dto);
    return await this.repo.save(cartFound);
  }

  async adjustQuantity(userId: string, itemId: string, quantity: CartItemQuantityDTO | number) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    const cartFound = await this.repo.findByUser(userId);
    if (!cartFound) throw new BadRequestException(STRINGS.notFound('Cart'));

    const cartItemFound = cartFound.cartItems.find(item => item.id === itemId);
    if (!cartItemFound) throw new BadRequestException(STRINGS.notFound('Cart item'));

    cartItemFound.quantity = quantity as number;
    
    return await this.repo.saveItem(cartItemFound);
  }

  async remove(id: string) {
    const cart = await this.repo.findById(id);
    if (!cart) throw new BadRequestException(STRINGS.notFound('Cart'));

    return this.repo.remove(cart);
  }

  async clearCart(userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    const cartFound = await this.repo.findByUser(userId);
    if (!cartFound) throw new BadRequestException(STRINGS.notFound('Cart'));

    return this.repo.clearCart(cartFound.id);
  }
}
