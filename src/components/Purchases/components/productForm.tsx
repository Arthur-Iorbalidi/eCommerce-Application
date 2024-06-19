import { BiX } from 'react-icons/bi';
import { ClientResponse, Product } from '@commercetools/platform-sdk';
import { ReactNode } from 'react';
import Button from '../../../shared/ui/Button/Button';
import styles from './productForm.module.scss';
import deleteItemFromCart from '../../../services/api/cart/deleteItemFromCart';
import getCalculatedPrice from '../../../services/helpers/getCalculatedPrice';

interface Props {
  key: string;
  data;
}

function ProductForm(product: Props) {
  return (
    <div className={styles.productItem}>
      <div className={styles.photoWrapper}>
        <img
          className={styles.photo}
          src={product.data.variant.images?.[0].url}
          alt=""
        />
      </div>
      <div className={styles.content}>
        <div className={styles.prices_link}>
          <div className={styles.prices}>
            {product.data.price.discounted ? (
              <span className={styles.currentPrice}>
                {getCalculatedPrice(
                  +product.data.price.discounted.value.centAmount,
                  2,
                )}
              </span>
            ) : null}
            <span
              className={
                product.data.price.discounted
                  ? styles.fullPrice
                  : styles.currentPrice
              }
            >
              {getCalculatedPrice(+product.data.price.value.centAmount, 2)}
            </span>
          </div>
          <Button
            value={(<BiX />) as ReactNode}
            color="red"
            onClick={() => {
              deleteItemFromCart(product.data.productId, product.onDelete);
            }}
          />
        </div>
        <div className={styles.nameBlock}>
          <span className={styles.name}>{product.data.name.en}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
