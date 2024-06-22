import {
  Category,
  ClientResponse,
  ProductDiscount,
  ProductDiscountPagedQueryResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';

import getCategories from '../../../../services/api/categories/getCategories';
import getProductDiscounts from '../../../../services/api/products/getProductDiscounts';
import getProductsZero from '../../../../services/api/products/getProducts_zero';

import getUniqueProductAttributes from '../../../../services/helpers/getUniqueProductAttributes';

import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import useAppSelector from '../../../../shared/hooks/useAppSelector';
import { setCategories } from '../../../../store/reducers/filtersSlice';

import filterAttributes from '../../../Catalog/components/filters/filterAttributes';
import { orderOptions, sortOptions } from '../../../Catalog/sortOptions';

import Loader from '../../../../shared/ui/Loader/loader';
import BrandsSection from './components/brandsSection/brandsSection';
import CategoriesSection from './components/categoriesSection/categoriesSection';
import ArrivalsSection from './components/arrivalsSection/arrivalsSection';
import SaleSection from './components/saleSection/saleSection';

import styles from './mainInfo.module.scss';

const PRODUCTS_LIMIT = 100;

const MainInfo: React.FC = () => {
  const dispatch = useAppDispatch();

  const allCategories = useAppSelector(
    (state) => state.filtersReducer.categories,
  );

  const [productDiscounts, setProductDiscounts] = useState<ProductDiscount[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  function processProductsResponse(
    value: ClientResponse<ProductProjectionPagedSearchResponse>,
  ) {
    setProducts(value.body.results);

    setBrands(
      getUniqueProductAttributes(value.body.results, filterAttributes.BRAND),
    );
  }

  function processProductDiscountsResponse(
    value: ClientResponse<ProductDiscountPagedQueryResponse>,
  ): void {
    setIsLoading(false);

    setProductDiscounts(value.body.results);
  }

  useEffect(() => {
    if (!allCategories.length) {
      getCategories((response) => {
        const categories: Category[] = response.body.results;
        dispatch(setCategories(categories));
      });
    }
  }, [allCategories, dispatch]);

  useEffect(() => {
    if (!productDiscounts.length) {
      setIsLoading(true);

      getProductDiscounts(processProductDiscountsResponse);
    }
  }, [productDiscounts.length]);

  useEffect(() => {
    const sortByPublicationDate = sortOptions[0].value;
    const ascendingOrder = orderOptions[0].value;

    if (!products.length) {
      getProductsZero(
        processProductsResponse,
        PRODUCTS_LIMIT,
        sortByPublicationDate,
        ascendingOrder,
      );
    }
  }, [products.length]);

  return (
    <div className={styles.mainInfo_wrapper}>
      <div className={styles.mainInfo_container}>
        {isLoading && (
          <div className={styles.loader_container}>
            <Loader />
          </div>
        )}

        <SaleSection productDiscounts={productDiscounts} />

        <CategoriesSection categories={allCategories} />

        <BrandsSection brands={brands} />

        <ArrivalsSection products={products} />
      </div>
    </div>
  );
};

export default MainInfo;
