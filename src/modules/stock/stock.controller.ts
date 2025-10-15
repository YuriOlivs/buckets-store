import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { StockUpdateDTO } from './dto/stock-update-dto';
import { StockService } from './stock.service';
import { AuthGuard } from '../auth/auth.guard';
import StockResponseDTO from './dto/stock-response.dto';
import StockMapper from './dto/stock.mapper';
import { STRINGS } from 'src/common/strings/global.strings';

@UseGuards(AuthGuard)
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) { }
  @Get()
  async findAllProductStock() {
    const productStock = await this.stockService.findAllProductStock();
    return productStock.map(StockMapper.toDTO);
  }

  @Get('/:product_id')
  async findByProduct(@Param('product_id') id: string) {
    const productStock = await this.stockService.findByProduct(id);
    return StockMapper.toDTO(productStock);
  }

  @Patch('/:product_id')
  async updateQuantity(@Param('product_id') id: string, @Body() dto: StockUpdateDTO) {
    const productStock = await this.stockService.updateQuantity(id, dto);
    return {
      message: STRINGS.entityUpdated(`Stock for Product ${id}`),
      payload: StockMapper.toDTO(productStock)
    }
  }
}
