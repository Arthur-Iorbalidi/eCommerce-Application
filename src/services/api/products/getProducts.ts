import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';

export default function getProducts(
  callBack: (
    value: ClientResponse<ProductProjectionPagedSearchResponse>,
  ) => void,
  limit: number = 100,
  sortOption: string,
  orderOption: string,
  searchText: string,
): void {
  zeroClientApi()
    .withProjectKey({ projectKey })
    .productProjections()
    .search()
    .get({
      queryArgs: {
        limit,
        sort: `${sortOption} ${orderOption}`,
        'text.EN': searchText,
      },
    })
    .execute()
    .then((res) => {
      if (res.statusCode === 200) {
        callBack(res);
      }
    });
}
