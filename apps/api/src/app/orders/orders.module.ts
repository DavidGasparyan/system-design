import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { StripeModule } from '../modules/stripe/stripe.module';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ProductsModule } from "../products/products.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    StripeModule,
    ProductsModule,
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_MICROSERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [`${configService.get('RABBITMQ_HOST')}`],
            queue: 'products_queue',
            queueOptions: {
              durable: false
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
  ],
  exports: [
    TypeOrmModule,
    ClientsModule,
  ],
})
export class OrdersModule {}
