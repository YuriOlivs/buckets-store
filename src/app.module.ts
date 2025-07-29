import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { TeamModule } from './modules/team/team.module';
import { ImageModule } from './modules/image/image.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    UserModule, 
    ProductModule,
    TeamModule,
    ImageModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    OrderModule
  ],
})
export class AppModule { }
