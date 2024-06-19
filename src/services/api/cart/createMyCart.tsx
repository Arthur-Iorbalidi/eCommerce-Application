import { projectKey } from '..';
import zeroClientApi from '../ZeroClient';

export default function createMyCart(currency: string) {
  if (!localStorage.getItem('cart')) {
    zeroClientApi()
      .withProjectKey({ projectKey })
      .carts()
      .post({
        body: { currency, deleteDaysAfterLastModification: 1 },
        headers: { 'Content-Type': 'application/json' },
      })
      .execute()
      .then((ress) => {
        const currentCart = {
          cartId: ress.body.id,
          version: ress.body.version,
        };
        localStorage.setItem('cart', JSON.stringify(currentCart));
      });
  }
}
