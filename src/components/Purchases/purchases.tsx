import { useEffect, useState } from 'react';
import { ClientResponse, Cart } from '@commercetools/platform-sdk';

import { Link } from 'react-router-dom';
import getMyCart from '../../services/api/cart/getMyCart';
import ProductForm from './components/productForm';
import styles from './purchases.module.scss';
import getCalculatedPrice from '../../services/helpers/getCalculatedPrice';
import useAppDispatch from '../../shared/hooks/useAppDispatch';
import {
  resetActiveBrands,
  resetActiveCategoryId,
  resetActiveDisplayDiagonals,
  resetActiveOsArray,
  resetPriceRange,
} from '../../store/reducers/filtersSlice';
import {
  resetCurrentPage,
  resetSortOption,
  resetSortOrderOption,
} from '../../store/reducers/sortSlice';

export default function Purchases() {
  const dispatch = useAppDispatch();

  const [cart, changeCart] = useState<Cart | undefined>();
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

  function handleCatalogReset() {
    dispatch(resetActiveCategoryId());
    dispatch(resetActiveBrands());
    dispatch(resetActiveDisplayDiagonals());
    dispatch(resetActiveOsArray());
    dispatch(resetPriceRange());

    dispatch(resetCurrentPage());
    dispatch(resetSortOption());
    dispatch(resetSortOrderOption());
  }

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
          <Link
            to="/catalog"
            onClick={() => {
              handleCatalogReset();
            }}
          >
            Catalog
          </Link>
        </div>
      )}
    </div>
  );
}
