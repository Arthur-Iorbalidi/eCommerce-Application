import { Product } from '@commercetools/platform-sdk';
import { FaShoppingBasket } from 'react-icons/fa';
import { ReactNode } from 'react';
import Button from '../Button/Button';
import styles from './productItem.module.scss';

interface Props {
  key: string;
  value: Product;
}

function ProductItem(product: Props) {
  function calculatePrice(price: number, fractionDigits: number) {
    return price / 10 ** fractionDigits;
  }

  function addDiscription(text?: string) {
    if (!text) {
      return [];
    }

    return text.split('\n').map((elem, index) => {
      const key = `${index}_${elem}`;
      return <span key={key}>{elem}</span>;
    });
  }

  return (
    <div className={styles.productItem}>
      <div className={styles.photoWrapper}>
        <img
          className={styles.photo}
          src={product.value.masterData.current.masterVariant.images?.[0].url}
          alt=""
        />
      </div>
      <div className={styles.content}>
        <div className={styles.prices_link}>
          <div className={styles.prices}>
            <span className={styles.currentPrice}>
              $
              {Math.round(
                calculatePrice(
                  product.value.masterData.current.masterVariant.prices?.[0]
                    .value.centAmount as number,
                  product.value.masterData.current.masterVariant.prices?.[0]
                    .value.fractionDigits as number,
                ) * 0.9,
              )}
            </span>
            <span className={styles.usuallPrice}>
              $
              {calculatePrice(
                product.value.masterData.current.masterVariant.prices?.[0].value
                  .centAmount as number,
                product.value.masterData.current.masterVariant.prices?.[0].value
                  .fractionDigits as number,
              )}
            </span>
          </div>
          <Button value={(<FaShoppingBasket />) as ReactNode} color="green" />
        </div>
        <div className={styles.nameBlock}>
          <span className={styles.name}>
            {product.value.masterData.current.name.en}
          </span>
        </div>
        <div className={styles.descriptionBlock}>
          <span className={styles.description}>
            {addDiscription(product.value.masterData.current.description?.en)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
