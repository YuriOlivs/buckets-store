import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { TeamModule } from './modules/team/team.module';
import { ImageModule } from './modules/image/image.module';
import { OrderModule } from './modules/order/order.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { OrderStatusModule } from './modules/order-status/order-status.module';
import { APP_FILTER } from '@nestjs/core';
import { AddressModule } from './modules/address/address.module';
import GlobalExceptionFilter from './common/filters/global-exception.filter';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    UserModule,
    ProductModule,
    TeamModule,
    ImageModule,
    OrderModule,
    OrderItemModule,
    OrderStatusModule,
    CacheModule.register({ isGlobal: true, ttl: 10000 }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    AddressModule,
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter
  }],
})
export class AppModule { }
