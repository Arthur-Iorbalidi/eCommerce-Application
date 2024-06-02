/* eslint-disable react/no-array-index-key */
/* eslint-disable operator-linebreak */
import { ReactNode, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ClientResponse, Product } from '@commercetools/platform-sdk';
import Carousel from 'react-bootstrap/Carousel';
import { BsArrowLeftShort } from 'react-icons/bs';
import { FaShoppingBasket } from 'react-icons/fa';
import Button from '../../shared/ui/Button/Button';
import getProductByKey from '../../services/api/products/getProductByKey';
import Loader from '../../shared/ui/Loader/loader';
import ProductModal from './productModal/productModal';
import 'bootstrap/dist/css/bootstrap.css';
import splitTextIntoLines from '../../services/api/helpers/splitTextIntoLines';
import getDiscountedPrice from '../../services/api/helpers/getDiscountedPrice';
import getFullPrice from '../../services/api/helpers/getFullPrice';

import styles from './product.module.scss';

function ProductPage() {
  const { key } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const errorProductFetch = () => {
    setIsLoading(false);
    setIsError(true);
  };

  useEffect(() => {
    setIsLoading(true);
    if (key) {
      getProductByKey(
        (value: ClientResponse<Product>) => {
          setProduct(value.body);
          setIsLoading(false);
        },
        errorProductFetch,
        key,
      );
    }
  }, [key]);

  if (isError) {
    return <Navigate to="/error" replace />;
  }

  return (
    <div className={styles.product_container}>
      <div className={styles.product_box}>
        <div className={styles.goBack_btn_wrapper}>
          <Link to="/catalog">
            <Button
              className={styles.goBack_btn}
              value={
                (
                  <BsArrowLeftShort className={styles.goBack_btn_arrow} />
                ) as ReactNode
              }
              color="green"
            />
          </Link>
        </div>
        {product && (
          <h2 className={styles.product_title}>
            {product.masterData.current.name.en}
          </h2>
        )}
        <div className={styles.product_box_container}>
          <Carousel
            className={styles.carousel}
            data-bs-theme="dark"
            slide={false}
            nextIcon=""
            prevIcon=""
            keyboard
            interval={null}
          >
            {product &&
              product.masterData.current.masterVariant.images!.map(
                (image, index) => (
                  <Carousel.Item
                    className={styles.carousel_item}
                    onClick={() => setShowModal(true)}
                    key={`item-${index}`}
                  >
                    <img
                      className={styles.slide_img}
                      alt={`device-${index}`}
                      src={image.url}
                    />
                  </Carousel.Item>
                ),
              )}
          </Carousel>

          {product && (
            <div>
              {product.masterData.current.masterVariant
                .attributes!.slice(-1)
                .map((characteristics) => (
                  <div className={styles.characteristics} key="characteristics">
                    <strong className={styles.characteristics_title}>
                      Characteristics:
                    </strong>
                    {splitTextIntoLines(characteristics.value, true)}
                  </div>
                ))}
            </div>
          )}
        </div>

        <hr />
        {product && (
          <div className={styles.price_wrapper}>
            <div className={styles.prices}>
              <span className={styles.currentPrice}>
                {getDiscountedPrice(product)}
              </span>
              <span className={styles.fullPrice}>{getFullPrice(product)}</span>
            </div>
            <Button
              className={styles.basket_btn}
              value={(<FaShoppingBasket />) as ReactNode}
              color="green"
            />
          </div>
        )}
        <hr />

        {product && (
          <div>
            {product.masterData.current.masterVariant
              .attributes!.slice(-2, -1)
              .map((description) => (
                <div className={styles.description} key="description">
                  <strong className={styles.description_title}>
                    Description:
                  </strong>
                  {splitTextIntoLines(description.value)}
                </div>
              ))}
          </div>
        )}
      </div>
      {showModal && (
        <ProductModal
          images={product?.masterData.current.masterVariant.images || []}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      {isLoading && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default ProductPage;
