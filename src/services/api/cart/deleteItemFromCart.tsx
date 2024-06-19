import { ClientResponse, Cart, LineItem } from '@commercetools/platform-sdk';

import zeroClientApi from '../ZeroClient';
import getMyCart from './getMyCart';
import { projectKey } from '..';

export default function deleteItemFromCart(
  productId: string,
  callBack?: (val?: string) => void,
) {
  let cartId: string;
  let version: string;

  function updateLocalCart(value: ClientResponse<Cart>) {
    const currentCart = {
      cartId: value.body.id,
      version: value.body.version,
    };
    localStorage.setItem('cart', JSON.stringify(currentCart));

    const lineItemId = value.body.lineItems.filter(
      (elem: LineItem) => elem.productId === productId,
    );
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
            actions: [
              { action: 'removeLineItem', lineItemId: lineItemId[0].id },
            ],
          },
          headers: { 'Content-Type': 'application/json' },
        })
        .execute()
        .then(() => {
          if (callBack) {
            callBack();
          }
        });
    }
  }
  getMyCart(updateLocalCart);
}
