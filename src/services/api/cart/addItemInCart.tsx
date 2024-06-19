import { ClientResponse, Cart } from '@commercetools/platform-sdk';
import zeroClientApi from '../ZeroClient';
import getMyCart from './getMyCart';
import { projectKey } from '..';

export default function addItemInCart(
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
            actions: [{ action: 'addLineItem', productId }],
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
