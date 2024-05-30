import { Product } from '@commercetools/platform-sdk';
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
        <div className={styles.prices}>
          <span className={styles.currentPrice}>
            $
            {calculatePrice(
              product.value.masterData.current.masterVariant.prices?.[0].value
                .centAmount as number,
              product.value.masterData.current.masterVariant.prices?.[0].value
                .fractionDigits as number,
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
        <div className={styles.name_link}>
          <span className={styles.name}>
            {product.value.masterData.current.name.en}
          </span>
          <Button value="🡢" color="green" />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
