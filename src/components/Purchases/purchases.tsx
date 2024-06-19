import { useEffect, useState } from 'react';
import { ClientResponse, Cart } from '@commercetools/platform-sdk';

import { Link } from 'react-router-dom';
import getMyCart from '../../services/api/cart/getMyCart';
import ProductForm from './components/productForm';
import styles from './purchases.module.scss';
import getCalculatedPrice from '../../services/helpers/getCalculatedPrice';

export default function Purchases() {
  const [cart, changeCart] = useState<Cart | undefined>();
  const [stateWithProducts, changeStateWithProducts] = useState([]);

  function putProductsInState(value: ClientResponse) {
    changeCart(() => value.body);
    changeStateWithProducts(value.body.lineItems);
  }
  useEffect(() => getMyCart(putProductsInState), []);

  return (
    <div>
      {stateWithProducts.length !== 0 ? (
        <div>
          <div className={styles.purchasesWrapper}>
            {stateWithProducts.map((elem, index) =>
              ProductForm({
                key: `${index}`,
                data: elem,
                onDelete: () => getMyCart(putProductsInState),
              }),
            )}
          </div>
          <div>{`Total cost: ${cart!.totalPrice! ? getCalculatedPrice(+cart!.totalPrice.centAmount, 2) : 0}`}</div>
        </div>
      ) : (
        <div>
          No products...
          <Link to="/catalog">Catalog</Link>
        </div>
      )}
    </div>
  );
}
