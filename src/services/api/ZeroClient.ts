import {
  ClientBuilder,
  Client,
  AuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';
import { httpMiddlewareOptions, projectKey } from './index';

export default function zeroClientApi(): ApiRoot {
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: 'https://auth.us-east-2.aws.commercetools.com',
    projectKey: 'ecomcraft',
    credentials: {
      clientId: '5vv2jfvkFhqnA-_iU6y8CHBR',
      clientSecret: 'BBIBNKdlIwKWVsiWrCSW1oM5Pkg3SStT',
    },
    scopes: [
      'manage_my_orders:ecomcraft manage_products:ecomcraft manage_my_shopping_lists:ecomcraft manage_shopping_lists:ecomcraft:the-good-store manage_my_payments:ecomcraft manage_payments:ecomcraft view_orders:ecomcraft:the-good-store manage_cart_discounts:ecomcraft manage_my_shopping_lists:ecomcraft:the-good-store manage_customers:ecomcraft:the-good-store manage_shopping_lists:ecomcraft manage_customers:ecomcraft manage_customer_groups:ecomcraft manage_orders:ecomcraft manage_my_profile:ecomcraft manage_orders:ecomcraft:the-good-store manage_extensions:ecomcraft manage_cart_discounts:ecomcraft:the-good-store manage_tax_categories:ecomcraft manage_categories:ecomcraft manage_project_settings:ecomcraft manage_my_profile:ecomcraft:the-good-store manage_discount_codes:ecomcraft create_anonymous_token:ecomcraft manage_shipping_methods:ecomcraft manage_my_orders:ecomcraft:the-good-store manage_types:ecomcraft manage_order_edits:ecomcraft',
    ],
    fetch,
  };

  const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    // .withLoggerMiddleware()
    .build();
  return createApiBuilderFromCtpClient(client);
}
