import {
  ProductProjection,
  ClientResponse,
  Cart,
} from '@commercetools/platform-sdk';
import { FaShoppingBasket } from 'react-icons/fa';
import { ReactNode, useState, useEffect } from 'react';
import addItemInCart from '../../../services/api/cart/addItemInCart';
import deleteItemFromCart from '../../../services/api/cart/deleteItemFromCart';
import getMyCart from '../../../services/api/cart/getMyCart';
import Button from '../Button/Button';
import styles from './productItem.module.scss';
import splitTextIntoLines from '../../../services/helpers/splitTextIntoLines';
import getDiscountedPrice from '../../../services/helpers/getDiscountedPrice';
import getFullPrice from '../../../services/helpers/getFullPrice';

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
  }, [product]);

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
          <Button
            value={
              isInCart
                ? 'Delete from cart'
                : ((<FaShoppingBasket />) as ReactNode)
            }
            color="green"
            onClick={() => {
              if (isInCart) {
                deleteItemFromCart(product.value.id, () =>
                  getMyCart(checkIfInCart),
                );
              } else {
                addItemInCart(product.value.id, () => getMyCart(checkIfInCart));
              }
            }}
          />
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
