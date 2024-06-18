/* eslint-disable react/no-array-index-key */
import { ProductProjection } from '@commercetools/platform-sdk';

import { Link } from 'react-router-dom';

import { Carousel } from 'react-bootstrap';

import styles from './arrivalsSection.module.scss';

interface ArrivalsSectionProps {
  products: ProductProjection[];
}

const ArrivalsSection: React.FC<ArrivalsSectionProps> = (
  props: ArrivalsSectionProps,
) => {
  const { products } = props;

  const COUNT_OF_NEW_PRODUCTS = 6;
  const COUNT_0F_PRODUCTS_PER_SLIDE = 2;

  const groupedProducts = [];

  for (let i = 0; i < COUNT_OF_NEW_PRODUCTS; i += COUNT_0F_PRODUCTS_PER_SLIDE) {
    groupedProducts.push(products.slice(i, i + COUNT_0F_PRODUCTS_PER_SLIDE));
  }

  return (
    <section className={styles.arrivals_section}>
      <h2>New Arrival</h2>

      <Carousel
        data-bs-theme="dark"
        className={styles.carousel}
        controls={false}
        fade
      >
        {groupedProducts.map((group, groupIndex) => (
          <Carousel.Item
            className={styles.product_carousel_item}
            key={`group-${groupIndex}`}
          >
            {group.map((product) => {
              const productKey = `/catalog/product/${product.key}`;
              const productImage = product.masterVariant.images?.[0]?.url;
              const productName = product.name.en;

              return (
                <Link
                  className={styles.product_list_link}
                  to={productKey}
                  key={product.id}
                >
                  <img
                    className={styles.product_img}
                    alt={product.key}
                    src={productImage}
                  />
                  <p className={styles.product_name}>{productName}</p>
                </Link>
              );
            })}
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};

export default ArrivalsSection;
