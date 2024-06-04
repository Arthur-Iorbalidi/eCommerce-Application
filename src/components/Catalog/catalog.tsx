/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  Category,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';

import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

import useAppDispatch from '../../shared/hooks/useAppDispatch';
import useAppSelector from '../../shared/hooks/useAppSelector';
import {
  setBrands,
  setCategories,
  setDisplayDiagonals,
  setOsArray,
} from '../../store/reducers/filtersSlice';

import Button from '../../shared/ui/Button/Button';
import ProductItem from '../../shared/ui/ProductItem/productItem';
import Loader from '../../shared/ui/Loader/loader';
import Filters from './components/filters';

import filterAttributes from './components/filterAttributes';

import { orderOptions, sortOptions } from './sortOptions';
import convertDollarsToCents from '../../services/helpers/convertDollarsToCents';
import getUniqueProductAttributes from '../../services/helpers/getUniqueProductAttributes';

import getCategories from '../../services/api/categories/getCategories';
import getProducts from '../../services/api/products/getProducts';

import styles from './catalog.module.scss';

const PRODUCTS_LIMIT = 100;

function Catalog() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const activeCategoryId = useAppSelector(
    (state) => state.filtersReducer.activeCategoryId,
  );
  const priceRange = useAppSelector((state) => state.filtersReducer.priceRange);
  const activeBrands = useAppSelector(
    (state) => state.filtersReducer.activeBrands,
  );
  const activeOsArray = useAppSelector(
    (state) => state.filtersReducer.activeOsArray,
  );
  const activeDisplayDiagonals = useAppSelector(
    (state) => state.filtersReducer.activeDisplayDiagonals,
  );

  const [sortOption, setSortOption] = useState(sortOptions[0].value);
  const [orderOption, setOrderOption] = useState(orderOptions[0].value);
  const [searchText, setSearchText] = useState('');
  const [inputSearchText, setInputSearchText] = useState('');

  const selectSortOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };
  const selectOrderOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderOption(event.target.value);
  };
  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchText(inputSearchText);
  };

  function processProductsResponse(
    value: ClientResponse<ProductProjectionPagedSearchResponse>,
  ) {
    setProducts(value.body.results);
    setIsLoading(false);
    dispatch(
      setBrands(
        getUniqueProductAttributes(value.body.results, filterAttributes.BRAND),
      ),
    );
    dispatch(
      setOsArray(
        getUniqueProductAttributes(value.body.results, filterAttributes.OS),
      ),
    );
    dispatch(
      setDisplayDiagonals(
        getUniqueProductAttributes(
          value.body.results,
          filterAttributes.DISPLAY_DIAGONAL,
        ),
      ),
    );
  }

  useEffect(() => {
    setIsLoading(true);

    getCategories((response) => {
      const categories: Category[] = response.body.results;
      dispatch(setCategories(categories));
    });

    const convertedPriceRange = {
      min: convertDollarsToCents(priceRange.min),
      max: convertDollarsToCents(priceRange.max),
    };

    getProducts(
      processProductsResponse,
      PRODUCTS_LIMIT,
      sortOption,
      orderOption,
      searchText,
      activeCategoryId,
      convertedPriceRange,
      activeBrands,
      activeOsArray,
      activeDisplayDiagonals,
    );
  }, [
    sortOption,
    orderOption,
    searchText,
    activeCategoryId,
    priceRange,
    activeBrands,
    activeOsArray,
    activeDisplayDiagonals,
    dispatch,
  ]);

  const navigateToProduct = (productKey: string) => {
    navigate(`product/${productKey}`);
  };

  return (
    <div className={styles.catalog}>
      {isLoading && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
      <div className={styles.search}>
        <Button
          className={styles.filterBtn}
          value="Filter"
          color="green"
          onClick={() => setShowFilters(true)}
        />
        <form onSubmit={search} className={styles.form}>
          <input
            onChange={(event) => setInputSearchText(event.target.value)}
            value={inputSearchText}
            className={styles.input}
            type="text"
            placeholder="Search"
          />
          <Button
            type="submit"
            className={styles.searchBtn}
            value="Search"
            color="green"
          />
        </form>
      </div>
      <div className={styles.sortField}>
        <div className={styles.sortBlock}>
          <span className={styles.sortHeader}>Sort by</span>
          <Form.Select onChange={selectSortOption} className={styles.sort}>
            {sortOptions.map((option) => (
              <option key={option.name} value={option.value}>
                {option.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className={styles.orderBlock}>
          <span className={styles.orderHeader}>Order by</span>
          <Form.Select onChange={selectOrderOption} className={styles.order}>
            {orderOptions.map((option) => (
              <option key={option.name} value={option.value}>
                {option.name}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>

      {products.length > 0 ? (
        <div className={styles.productList}>
          {products.map((product) => (
            <ProductItem
              key={product.id}
              value={product}
              onClick={() => navigateToProduct(product.key!)}
            />
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className={styles.noProducts_message}>
            Sorry, we couldn&apos;t find what you&apos;re looking for!
          </p>
        )
      )}

      {showFilters && (
        <Filters showFilters={showFilters} setShowFilters={setShowFilters} />
      )}
    </div>
  );
}

export default Catalog;
