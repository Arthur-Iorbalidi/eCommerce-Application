import { Product } from '@commercetools/platform-sdk';
import { FaShoppingBasket } from 'react-icons/fa';
import { ReactNode } from 'react';
import Button from '../Button/Button';
import styles from './productItem.module.scss';
import splitTextIntoLines from '../../../services/api/helpers/splitTextIntoLines';
import getDiscountedPrice from '../../../services/api/helpers/getDiscountedPrice';
import getFullPrice from '../../../services/api/helpers/getFullPrice';

interface Props {
  key: string;
  value: Product;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function ProductItem(product: Props) {
  return (
    <div className={styles.productItem} onClick={product.onClick}>
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
              {getDiscountedPrice(product.value)}
            </span>
            <span className={styles.fullPrice}>
              {getFullPrice(product.value)}
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
            {splitTextIntoLines(
              product.value.masterData.current.description?.en,
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
