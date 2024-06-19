import zeroClientApi from '../ZeroClient';
import { projectKey } from '..';

export default function updateCart(
  productId: string,
  actionType: 'addLineItem' | 'removeLineItem',
) {
  let cartId: string;
  let version: string;

  if (localStorage.getItem('cart')) {
    cartId = JSON.parse(localStorage.getItem('cart') as string).cartId;
    version = JSON.parse(localStorage.getItem('cart') as string).version;

    zeroClientApi()
      .withProjectKey({ projectKey })
      .carts()
      .withId({ ID: cartId })
      .post({
        body: {
          version: +version,
          actions: [{ action: actionType, productId }],
        },
        headers: { 'Content-Type': 'application/json' },
      })
      .execute()
      .then((ress) => {
        return ress;
      });
  }
}
