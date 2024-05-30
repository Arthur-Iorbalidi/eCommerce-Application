import {
  ClientBuilder,
  Client,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  createApiBuilderFromCtpClient,
  ApiRoot,
} from '@commercetools/platform-sdk';
import makePersistentTokenCache from './helpers/tokenCreation';
import { httpMiddlewareOptions, projectKey } from './index';
import aftere from './helpers/afterExecution';

export default function authClientApi(userData: {
  username: string;
  password: string;
}): ApiRoot {
  const authMiddlewareOptions: PasswordAuthMiddlewareOptions = {
    host: 'https://auth.us-east-2.aws.commercetools.com',
    projectKey: 'ecomcraft',
    credentials: {
      clientId: 'gBeOxkVmgJtFeerPTHUyI--g',
      clientSecret: 'dh1hCg0hB25MMESN9wbFc37yeSKkRDG0',
      user: {
        username: userData.username,
        password: userData.password,
      },
    },
    tokenCache: makePersistentTokenCache(),
    scopes: ['manage_project:ecomcraft'],
    fetch,
  };

  const client: Client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withPasswordFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withAfterExecutionMiddleware({
      name: 'мидлвар после действий',
      middleware: aftere,
    })
    // .withLoggerMiddleware() // Выводит в консоль отправленный запрос
    .build();

  return createApiBuilderFromCtpClient(client);
}
