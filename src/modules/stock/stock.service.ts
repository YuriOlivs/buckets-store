import { Injectable, NotFoundException } from '@nestjs/common';
import { StockUpdateDTO } from './dto/stock-update-dto';
import { StockRepository } from './stock.repository';
import { StockEntity } from './stock.entity';

@Injectable()
export class StockService {
  constructor(
    private readonly repo: StockRepository,
  ) {}

  async findAllProductStock(): Promise<StockEntity[]> {
    return await this.repo.findAllProductStock();
  }

  async findByProduct(productId: string): Promise<StockEntity> {
    const productStock = await this.repo.findByProduct(productId);
    if(!productStock) throw new NotFoundException('Stock for this product');

    return productStock;
  }

  async updateQuantity(productId: string, dto: StockUpdateDTO): Promise<StockEntity> {
    const productStock = await this.findByProduct(productId);
    productStock.quantity = dto.quantity;
    return await this.repo.updateQuantity(productStock, dto.quantity);
  }
}
