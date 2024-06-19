import { ClientResponse, Product } from '@commercetools/platform-sdk';
import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';

export default function getProductByKey(
  callBack: (value: ClientResponse<Product>) => void,
  errorCallback: () => void,
  productKey: string,
): void {
  zeroClientApi()
    .withProjectKey({ projectKey })
    .products()
    .withKey({ key: productKey })
    .get()
    .execute()
    .then((res) => {
      if (res.statusCode === 200) {
        callBack(res);
      }
    })
    .catch(() => {
      errorCallback();
    });
}
