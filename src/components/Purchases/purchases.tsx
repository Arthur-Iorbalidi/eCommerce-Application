import { useEffect, useState } from 'react';
import {
  ClientResponse,
  Cart,
  ProductProjection,
} from '@commercetools/platform-sdk';

import { Link } from 'react-router-dom';
import getMyCart from '../../services/api/cart/getMyCart';
import ProductForm from './components/productForm';
import styles from './purchases.module.scss';
import Button from '../../shared/ui/Button/Button';
import deleteItemFromCart from '../../services/api/cart/deleteItemFromCart';
import getCalculatedPrice from '../../services/helpers/getCalculatedPrice';

export default function Purchases() {
  const [cart, changeCart] = useState({});
  const [stateWithProducts, changeStateWithProducts] = useState([]);

  function putProductsInState(value: ClientResponse) {
    changeCart(() => value.body);
    changeStateWithProducts(value.body.lineItems);
  }
  useEffect(() => getMyCart(putProductsInState), []);

  function clearCart() {
    stateWithProducts.map((elem) => deleteItemFromCart(elem.productId));
    getMyCart(putProductsInState);
  }
  // const navigate = useNavigate();
  // function nav(value: string) {
  //   navigate(`/catalog/product/${value}`);
  // }
  return (
    <div>
      {stateWithProducts.length !== 0 ? (
        <div>
          <Button value="clear cart" color="red" onClick={() => clearCart()} />
          <div className={styles.purchasesWrapper}>
            {stateWithProducts.map((elem, index) =>
              ProductForm({
                key: `${index}`,
                data: elem,
                onDelete: () => getMyCart(putProductsInState),
              }),
            )}
          </div>
          <div>{`Total cost: ${cart.totalPrice ? getCalculatedPrice(+cart.totalPrice.centAmount, 2) : 0}`}</div>
        </div>
      ) : (
        <div>
          Ваша корзина пуста
          <Link to="/catalog">Catalog</Link>
        </div>
      )}
    </div>
  );
}
