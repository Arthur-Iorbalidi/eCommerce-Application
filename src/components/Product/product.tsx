/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
import { ReactNode, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ClientResponse, Product, Cart } from '@commercetools/platform-sdk';

import Carousel from 'react-bootstrap/Carousel';
import { HiOutlineHome, HiArrowRight, HiArrowLeft } from 'react-icons/hi2';
import { FaShoppingBasket } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';

import useAppDispatch from '../../shared/hooks/useAppDispatch';

import Loader from '../../shared/ui/Loader/loader';
import Button from '../../shared/ui/Button/Button';
import ProductModal from './components/productModal';

import getProductByKey from '../../services/api/products/getProductByKey';
import addItemInCart from '../../services/api/cart/addItemInCart';
import getMyCart from '../../services/api/cart/getMyCart';
import deleteItemFromCart from '../../services/api/cart/deleteItemFromCart';

import splitTextIntoLines from '../../services/helpers/splitTextIntoLines';
import getDiscountedPrice from '../../services/helpers/getDiscountedPrice';
import getFullPrice from '../../services/helpers/getFullPrice';

import {
  resetActiveBrands,
  resetActiveCategoryId,
  resetActiveDisplayDiagonals,
  resetActiveOsArray,
  resetPriceRange,
} from '../../store/reducers/filtersSlice';
import {
  resetCurrentPage,
  resetSortOption,
  resetSortOrderOption,
} from '../../store/reducers/sortSlice';

import styles from './product.module.scss';

function ProductPage() {
  const { categ, key } = useParams();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [isInCart, changeIsInCart] = useState(false);

  function checkIfInCart(val: ClientResponse<Cart>) {
    const arrayOfProducts = val.body.lineItems;
    changeIsInCart(false);

    // eslint-disable-next-line array-callback-return
    arrayOfProducts.map((elem) => {
      if (elem.productId === product!.id) {
        changeIsInCart(true);
      }
    });
  }

  useEffect(() => {
    getMyCart(checkIfInCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product!]);

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

  const resetFilters = () => {
    dispatch(resetActiveBrands());
    dispatch(resetActiveDisplayDiagonals());
    dispatch(resetActiveOsArray());
    dispatch(resetPriceRange());

    dispatch(resetCurrentPage());
  };

  const resetSorting = () => {
    dispatch(resetSortOption());
    dispatch(resetSortOrderOption());
  };

  return (
    <div className={styles.product_wrapper}>
      <div className={styles.product_container}>
        <div className={styles.product_box}>
          <div className={styles.breadcrumbs}>
            <Link
              to="/"
              onClick={() => {
                dispatch(resetActiveCategoryId());
                resetFilters();
                resetSorting();
              }}
              className={styles.breadcrumbs_link}
            >
              <HiOutlineHome />
            </Link>
            <HiArrowRight className={styles.breadcrumb_arrow} />
            <Link
              to="/catalog"
              onClick={() => {
                dispatch(resetActiveCategoryId());
                resetFilters();
                resetSorting();
              }}
              className={styles.breadcrumbs_link}
            >
              Catalog
            </Link>
            {categ && (
              <>
                <HiArrowRight className={styles.breadcrumb_arrow} />
                <Link
                  to={`/catalog/${categ}`}
                  onClick={() => {
                    resetFilters();
                    resetSorting();
                  }}
                  className={styles.breadcrumbs_link}
                >
                  {categ}
                </Link>
              </>
            )}
          </div>
          {product && (
            <h2 className={styles.product_title}>
              <Link to={categ ? `/catalog/${categ}` : '/catalog'}>
                <Button
                  className={styles.goBack_btn}
                  value={(<HiArrowLeft />) as ReactNode}
                  color="green"
                />
              </Link>
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
                    <div
                      className={styles.characteristics}
                      key="characteristics"
                    >
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
                  {getDiscountedPrice(
                    product.masterData.current.masterVariant.prices!,
                  )}
                </span>
                <span className={styles.fullPrice}>
                  {getFullPrice(
                    product.masterData.current.masterVariant.prices!,
                  )}
                </span>
              </div>
              {isInCart ? (
                <Button
                  className={styles.deleteFromCart_btn}
                  value={<RiDeleteBin6Fill />}
                  color="green"
                  onClick={() => {
                    deleteItemFromCart(product.id, () =>
                      getMyCart(checkIfInCart),
                    );
                  }}
                />
              ) : (
                <Button
                  value={(<FaShoppingBasket />) as ReactNode}
                  color="green"
                  onClick={() => {
                    addItemInCart(product.id, () => getMyCart(checkIfInCart));
                  }}
                />
              )}
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
    </div>
  );
}

export default ProductPage;
