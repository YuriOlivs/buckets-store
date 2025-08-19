import { CacheModule } from '@nestjs/cache-manager';
import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-yet';
import GlobalExceptionFilter from './common/filters/global-exception.filter';
import { GlobalLoggerInterceptor } from './common/interceptor/global-logger.interceptor';
import { PostgresConfigService } from './config/postgres.config.service';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartModule } from './modules/cart/cart.module';
import { ImageModule } from './modules/image/image.module';
import { OrderItemModule } from './modules/order-item/order-item.module';
import { OrderStatusModule } from './modules/order-status/order-status.module';
import { OrderModule } from './modules/order/order.module';
import { ProductModule } from './modules/product/product.module';
import { TeamModule } from './modules/team/team.module';
import { UserModule } from './modules/user/user.module';

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
    CartModule,
  ],
  providers: [
    {
    provide: APP_FILTER,
    useClass: GlobalExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalLoggerInterceptor
    },
    ConsoleLogger,
  ],
})
export class AppModule { }
