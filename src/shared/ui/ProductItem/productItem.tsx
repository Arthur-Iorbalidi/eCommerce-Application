import {
  ProductProjection,
  ClientResponse,
  Cart,
} from '@commercetools/platform-sdk';

import { ReactNode, useState, useEffect } from 'react';

import { FaShoppingBasket } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';

import Button from '../Button/Button';

import splitTextIntoLines from '../../../services/helpers/splitTextIntoLines';
import getDiscountedPrice from '../../../services/helpers/getDiscountedPrice';
import getFullPrice from '../../../services/helpers/getFullPrice';

import addItemInCart from '../../../services/api/cart/addItemInCart';
import deleteItemFromCart from '../../../services/api/cart/deleteItemFromCart';
import getMyCart from '../../../services/api/cart/getMyCart';

import styles from './productItem.module.scss';

interface Props {
  key: string;
  value: ProductProjection;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function ProductItem(product: Props) {
  const [isInCart, changeIsInCart] = useState(false);

  function checkIfInCart(val: ClientResponse<Cart>) {
    const arrayOfProducts = val.body.lineItems;
    changeIsInCart(false);

    // eslint-disable-next-line array-callback-return
    arrayOfProducts.map((elem) => {
      if (elem.productId === product.value.id) {
        changeIsInCart(true);
      }
    });
  }
  useEffect(() => {
    getMyCart(checkIfInCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.productItem} onClick={product.onClick}>
      <div className={styles.photoWrapper}>
        <img
          className={styles.photo}
          src={product.value.masterVariant.images?.[0].url}
          alt=""
        />
      </div>
      <div className={styles.content}>
        <div className={styles.prices_link}>
          <div className={styles.prices}>
            <span className={styles.currentPrice}>
              {getDiscountedPrice(product.value.masterVariant.prices!)}
            </span>
            <span className={styles.fullPrice}>
              {getFullPrice(product.value.masterVariant.prices!)}
            </span>
          </div>
          {isInCart ? (
            <Button
              className={styles.deleteFromCart_btn}
              value={<RiDeleteBin6Fill />}
              color="green"
              onClick={() => {
                deleteItemFromCart(product.value.id, () =>
                  getMyCart(checkIfInCart),
                );
              }}
            />
          ) : (
            <Button
              value={(<FaShoppingBasket />) as ReactNode}
              color="green"
              onClick={() => {
                addItemInCart(product.value.id, () => getMyCart(checkIfInCart));
              }}
            />
          )}
        </div>
        <div className={styles.nameBlock}>
          <span className={styles.name}>{product.value.name.en}</span>
        </div>
        <div className={styles.descriptionBlock}>
          <span className={styles.description}>
            {splitTextIntoLines(product.value.description?.en)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
