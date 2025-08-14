import { BadRequestException, Injectable } from '@nestjs/common';
import { CartCreateDTO } from './dto/cart/cart-create.dto';
import { CartUpdateDTO } from './dto/cart/cart-update.dto';
import CartRepository from './cart.repository';
import UserService from '../user/user.service';
import { STRINGS } from 'src/common/strings/global.strings';
import CartEntity from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    private repo: CartRepository,
    private userService: UserService
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

  async addItemToCart(userId: string, dto: CartCreateDTO) {
    const user = await this.userService.getUserById(userId);
    if (!user) throw new BadRequestException(STRINGS.notFound('User'));

    const cart = await this.findOrCreateCart(user.id);
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
