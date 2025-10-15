import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { StockRepository } from './stock.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockEntity } from './stock.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockEntity]),
  ],
  controllers: [StockController],
  providers: [StockService, StockRepository],
})
export class StockModule {}
