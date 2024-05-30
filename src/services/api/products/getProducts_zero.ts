import {
  ClientResponse,
  ProductPagedQueryResponse,
} from '@commercetools/platform-sdk';
import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';

export default function getProductsZero(
  callBack: (value: ClientResponse<ProductPagedQueryResponse>) => void,
): void {
  zeroClientApi()
    .withProjectKey({ projectKey })
    .products()
    .get()
    .execute()
    .then((res) => {
      if (res.statusCode === 200) {
        callBack(res);
      }
    });
}

import {
  ClientResponse,
  ProductPagedQueryResponse,
} from '@commercetools/platform-sdk';
import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';

export default function getProductsZero(
  callBack: (value: ClientResponse<ProductPagedQueryResponse>) => void,
): void {
  zeroClientApi()
    .withProjectKey({ projectKey })
    .products()
    .get()
    .execute()
    .then((res) => {
      if (res.statusCode === 200) {
        callBack(res);
      }
    });
}
