import { ProductDiscount } from '@commercetools/platform-sdk';

import { Carousel } from 'react-bootstrap';

import extractDateFromDateTime from '../../../../../../services/helpers/extractDateFromDateTime';

import styles from './saleSection.module.scss';

interface SaleSectionProps {
  productDiscounts: ProductDiscount[];
}

const SaleSection: React.FC<SaleSectionProps> = (props: SaleSectionProps) => {
  const { productDiscounts } = props;

  return (
    <section className={styles.sale_section}>
      <Carousel
        data-bs-theme="dark"
        className={styles.carousel}
        fade
        indicators={false}
      >
        {productDiscounts.map((discount) => (
          <Carousel.Item
            key={discount.name.en}
            className={styles.carousel_item}
          >
            <h5>{discount.name.en}</h5>
            <p>{`${discount.description!.en}`}</p>
            <div className={styles.sale_date}>
              <span>
                <span>From: </span>
                {`${extractDateFromDateTime(discount.validFrom!)}`}
              </span>
              <span>
                <span>To: </span>
                {`${extractDateFromDateTime(discount.validUntil!)}`}
              </span>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default SaleSection;
