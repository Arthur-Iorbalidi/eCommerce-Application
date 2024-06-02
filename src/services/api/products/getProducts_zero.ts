import {
  ClientResponse,
  ProductPagedQueryResponse,
} from '@commercetools/platform-sdk';
import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';

export default function getProductsZero(
  callBack: (value: ClientResponse<ProductPagedQueryResponse>) => void,
  limit: number = 100,
): void {
  zeroClientApi()
    .withProjectKey({ projectKey })
    .products()
    .get({
      queryArgs: {
        limit,
      },
    })
    .execute()
    .then((res) => {
      if (res.statusCode === 200) {
        callBack(res);
      }
    });
}
