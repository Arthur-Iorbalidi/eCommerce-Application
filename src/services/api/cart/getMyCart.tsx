import { ClientResponse, Cart } from '@commercetools/platform-sdk';

import zeroClientApi from '../ZeroClient';
import { projectKey } from '..';

export default function getMyCart(
  callBack: (val: ClientResponse<Cart>) => void,
) {
  let cartId: string;

  if (localStorage.getItem('cart')) {
    cartId = JSON.parse(localStorage.getItem('cart') as string).cartId;
    zeroClientApi()
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID: cartId })
      .get()
      .execute()
      .then((res) => {
        callBack(res);
      });
  }
}
