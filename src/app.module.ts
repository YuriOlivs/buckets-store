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
import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    TeamModule,
    ImageModule,
    OrderModule,
    OrderItemModule,
    OrderStatusModule,
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({
          ttl: 3600 * 1000
        }),
      }),
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    AddressModule,
    AuthModule,
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter
  }],
})
export class AppModule { }
