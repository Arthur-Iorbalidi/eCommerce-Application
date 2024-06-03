import { ProductProjection } from '@commercetools/platform-sdk';
import { FaShoppingBasket } from 'react-icons/fa';
import { ReactNode } from 'react';
import Button from '../Button/Button';
import styles from './productItem.module.scss';
import splitTextIntoLines from '../../../services/api/helpers/splitTextIntoLines';
import getDiscountedPrice from '../../../services/api/helpers/getDiscountedPrice';
import getFullPrice from '../../../services/api/helpers/getFullPrice';

interface Props {
  key: string;
  value: ProductProjection;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function ProductItem(product: Props) {
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
          <Button value={(<FaShoppingBasket />) as ReactNode} color="green" />
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
