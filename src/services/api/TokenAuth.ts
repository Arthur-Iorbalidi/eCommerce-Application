import {
  ClientBuilder,
  Client,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';
import { httpMiddlewareOptions, projectKey } from './index';

export default function tokenClientApi(token: string): ApiRoot {
  const authMiddlewareOptions: RefreshAuthMiddlewareOptions = {
    host: 'https://auth.us-east-2.aws.commercetools.com',
    projectKey: 'ecomcraft',
    credentials: {
      clientId: 'gBeOxkVmgJtFeerPTHUyI--g',
      clientSecret: 'dh1hCg0hB25MMESN9wbFc37yeSKkRDG0',
    },
    refreshToken: token,
    fetch,
  };

  const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withRefreshTokenFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  return createApiBuilderFromCtpClient(client);
}
