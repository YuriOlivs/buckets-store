import { Injectable, NotFoundException } from '@nestjs/common';
import { StockUpdateDTO } from './dto/stock-update-dto';
import { StockRepository } from './stock.repository';
import { StockEntity } from './stock.entity';
import StockUpdateListDTO from './dto/stock-update-list.dto';
import { STRINGS } from 'src/common/strings/global.strings';
import { StockStatusEnum } from './enum/stock-status.enum';

@Injectable()
export class StockService {
  constructor(
    private readonly repo: StockRepository,
  ) { }

  async findAllProductStock(): Promise<StockEntity[]> {
    return await this.repo.findAllProductStock();
  }

  async findByProduct(productId: string): Promise<StockEntity> {
    const productStock = await this.repo.findByProduct(productId);
    if (!productStock) throw new NotFoundException(STRINGS.notFound('Stock for this product'));

    return productStock;
  }

  async updateQuantity(dto: StockUpdateListDTO): Promise<StockEntity[]> {
    let productStockList: StockEntity[] = [];

    for (const item of dto.items) {
      const productStock = await this.findByProduct(item.productId);
      productStock.quantity = item.quantity;
      productStockList.push(productStock);
    }

    return await this.repo.updateQuantity(productStockList);
  }

  //uso interno apenas
  async updateStockByEntity(entities: StockEntity[]): Promise<StockEntity[]> {
    return await this.repo.updateQuantity(entities);
  }

  checkAvailability(stock: StockEntity, quantity: number) {
    if (stock.quantity < quantity || stock.status === StockStatusEnum.OUT_OF_STOCK) {
      throw new NotFoundException(STRINGS.notEnoughStock(stock.product.name));
    }

    return stock;
  }
}
