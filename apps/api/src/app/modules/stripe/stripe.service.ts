import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import * as util from 'util';

@Injectable()
export class StripeService {
  readonly stripe: Stripe;

  constructor(readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2022-11-15',
    });
  }

  async createPaymentIntent(
    orderId: string,
    totalAmount: number,
  ): Promise<Stripe.PaymentIntent> {
    if (!orderId || totalAmount < 1) {
      throw new UnprocessableEntityException(
        'The payment intent could not be created',
      );
    }

    try {
      const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
        amount: Number(totalAmount) * 100,
        currency: this.configService.get<string>('STRIPE_CURRENCY'),
        payment_method_types: ['card', 'klarna', 'alipay'],
        metadata: { orderId: orderId },
      };

      return await this.stripe.paymentIntents.create(paymentIntentParams);
    } catch (error) {
      Logger.error(
        '[stripeService] Error creating a payment intent',
        util.inspect(error),
      );
      throw new UnprocessableEntityException(
        'The payment intent could not be created',
      );
    }
  }
}
