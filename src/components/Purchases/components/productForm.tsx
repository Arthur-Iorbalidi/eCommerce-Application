/* eslint-disable react/jsx-one-expression-per-line */
import { LineItem } from '@commercetools/platform-sdk';

import { RiDeleteBin6Fill } from 'react-icons/ri';

import Button from '../../../shared/ui/Button/Button';

import deleteItemFromCart from '../../../services/api/cart/deleteItemFromCart';
import getCalculatedPrice from '../../../services/helpers/getCalculatedPrice';

import styles from './productForm.module.scss';

interface Props {
  key: string;
  data: LineItem;
  onDelete: () => void;
}

function ProductForm(product: Props) {
  return (
    <div className={styles.productItem}>
      <div className={styles.content}>
        <Button
          className={styles.deleteFromCart_btn}
          value={<RiDeleteBin6Fill />}
          color="green"
          onClick={() => {
            deleteItemFromCart(product.data.productId, product.onDelete);
          }}
        />

        <img
          className={styles.photo}
          src={product.data.variant.images?.[0].url}
          alt={product.data.name.en}
        />

        <div className={styles.nameBlock}>
          <h3 className={styles.name}>{product.data.name.en}</h3>
        </div>
        <div className={styles.prices_link}>
          <div className={styles.prices}>
            {product.data.price.discounted ? (
              <span className={styles.currentPrice}>
                $
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
              ${getCalculatedPrice(+product.data.price.value.centAmount, 2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
