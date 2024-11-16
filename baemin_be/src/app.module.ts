import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FoodsModule } from './foods/foods.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [PrismaModule, FoodsModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true
  }), OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
