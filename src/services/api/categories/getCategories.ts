import {
  ClientResponse,
  CategoryPagedQueryResponse,
} from '@commercetools/platform-sdk';
import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';

export default function getCategories(
  callBack: (value: ClientResponse<CategoryPagedQueryResponse>) => void,
): void {
  zeroClientApi()
    .withProjectKey({ projectKey })
    .categories()
    .get()
    .execute()
    .then((res) => {
      if (res.statusCode === 200) {
        callBack(res);
      }
    });
}
