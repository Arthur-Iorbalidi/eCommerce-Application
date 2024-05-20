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
      clientId: 'RlBMvn2sn62197P9TIkw14r2',
      clientSecret: 'aqHgp9COgupruACd3uwLyPK8V052lFGX',
    },
    scopes: [
      'view_products:ecomcraft manage_api_clients:ecomcraft create_anonymous_token:ecomcraft introspect_oauth_tokens:ecomcraft manage_customers:ecomcraft',
    ],
    fetch,
  };

  const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
  return createApiBuilderFromCtpClient(client);
}
