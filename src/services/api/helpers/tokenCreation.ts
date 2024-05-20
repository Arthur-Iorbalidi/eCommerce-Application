// Этот код указывает в инициализацию API в объект мидлвара:"authMiddlewareOptions" в
// ключ:"tokenCache"

import {
  TokenCache,
  TokenStore,
  TokenCacheOptions,
} from '@commercetools/sdk-client-v2';

const ANONYMOUS_TOKEN_STORAGE_KEY = 'ct-anonymous-token';

export default function makePersistentTokenCache(): TokenCache {
  let current: TokenStore | object = {};

  const storedValue = localStorage.getItem(ANONYMOUS_TOKEN_STORAGE_KEY);

  if (storedValue) {
    const parsed = JSON.parse(storedValue) as TokenStore;
    if ('expirationTime' in parsed && parsed.expirationTime >= Date.now()) {
      current = parsed;
    } else {
      localStorage.removeItem(ANONYMOUS_TOKEN_STORAGE_KEY);
      current = {};
    }
  }

  return {
    get: (_tokenCacheOptions?: TokenCacheOptions) => {
      if (current) {
        return current as TokenStore;
      }
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const storedValue = localStorage.getItem(ANONYMOUS_TOKEN_STORAGE_KEY);
      if (storedValue) {
        const parsed = JSON.parse(storedValue) as TokenStore;
        if ('expirationTime' in parsed && parsed.expirationTime >= Date.now()) {
          current = parsed;
        } else {
          localStorage.removeItem(ANONYMOUS_TOKEN_STORAGE_KEY);
          current = {};
        }
        return current as TokenStore;
      }
      return {} as TokenStore;
    },
    set: (newValue: TokenStore, _tokenCacheOptions?: TokenCacheOptions) => {
      current = newValue;
      localStorage.setItem(
        ANONYMOUS_TOKEN_STORAGE_KEY,
        JSON.stringify(current),
      );
      return current;
    },
  };
}
