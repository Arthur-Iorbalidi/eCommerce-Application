import {
  ClientResponse,
  ProductDiscountPagedQueryResponse,
} from '@commercetools/platform-sdk';
import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';

export default function getProductDiscounts(
  callBack?: (value: ClientResponse<ProductDiscountPagedQueryResponse>) => void,
): void {
  zeroClientApi()
    .withProjectKey({ projectKey })
    .productDiscounts()
    .get()
    .execute()
    .then((res) => {
      if (res.statusCode === 200) {
        if (callBack) {
          callBack(res);
        }
      }
    });
}
