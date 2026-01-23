import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';;
import { StockService } from './stock.service';
import { AuthGuard } from '../auth/auth.guard';
import StockMapper from './dto/stock.mapper';
import { STRINGS } from 'src/common/strings/global.strings';
import StockUpdateListDTO from './dto/stock-update-list.dto';
import { SellerGuard } from 'src/common/guards/seller.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Stock')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, SellerGuard)
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

  @Patch('/update-stock')
  async updateQuantity(@Body() dto: StockUpdateListDTO) {
    const productStock = await this.stockService.updateQuantity(dto);
    return {
      message: STRINGS.entityUpdated(`Product's stock`),
      payload: productStock.map(StockMapper.toDTO)
    }
  }
}
