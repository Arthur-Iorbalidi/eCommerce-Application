/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
  Category,
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { HiArrowRight, HiOutlineHome } from 'react-icons/hi2';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';
import createMyCart from '../../services/api/cart/createMyCart';
import useAppDispatch from '../../shared/hooks/useAppDispatch';
import useAppSelector from '../../shared/hooks/useAppSelector';
import {
  resetActiveBrands,
  resetActiveCategoryId,
  resetActiveDisplayDiagonals,
  resetActiveOsArray,
  resetPriceRange,
  setActiveCategoryId,
  setBrands,
  setCategories,
  setDisplayDiagonals,
  setOsArray,
} from '../../store/reducers/filtersSlice';
import {
  resetCurrentPage,
  setCurrentPage,
  setSortOption,
  setSortOrderOption,
} from '../../store/reducers/sortSlice';

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

const PRODUCTS_LIMIT = 8;

function Catalog() {
  const { categ } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductProjection[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [totalProductsNumber, setTotalProductsNumber] = useState(0);
  const [currency] = useState('USD');

  useEffect(
    () =>
      createMyCart(
        // Здесь забит в тупую тип валюты. Желательно переделать, чтоб завиело от чего-то
        currency,
      ),
    products,
  );

  const allCategories = useAppSelector(
    (state) => state.filtersReducer.categories,
  );
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

  const currentPage = useAppSelector((state) => state.sortReducer.currentPage);
  const sortOption = useAppSelector((state) => state.sortReducer.sortOption);
  const orderOption = useAppSelector((state) => state.sortReducer.orderOption);

  const [searchText, setSearchText] = useState('');
  const [inputSearchText, setInputSearchText] = useState('');

  const search = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchText(inputSearchText);
    dispatch(resetCurrentPage());
  };

  function processProductsResponse(
    value: ClientResponse<ProductProjectionPagedSearchResponse>,
  ) {
    setProducts(value.body.results);
    setTotalProductsNumber(value.body.total as number);
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
    if (!allCategories[0]) {
      getCategories((response) => {
        const categories: Category[] = response.body.results;
        dispatch(setCategories(categories));
      });
    }
  }, []);

  useEffect(() => {
    if (categ && allCategories.length > 0) {
      const category = allCategories.find((cat) => cat.externalId === categ);
      if (category) {
        dispatch(setActiveCategoryId(category.id));
      }
    }
  }, [categ, allCategories]);

  useEffect(() => {
    setIsLoading(true);

    const convertedPriceRange = {
      min: convertDollarsToCents(priceRange.min),
      max: convertDollarsToCents(priceRange.max),
    };

    getProducts(
      processProductsResponse,
      PRODUCTS_LIMIT,
      (currentPage - 1) * PRODUCTS_LIMIT,
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
    currentPage,
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

  const resetCatalogFilters = () => {
    dispatch(resetActiveCategoryId());
    dispatch(resetActiveBrands());
    dispatch(resetActiveDisplayDiagonals());
    dispatch(resetActiveOsArray());
    dispatch(resetPriceRange());
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
          <Form.Select
            onChange={(event) => {
              dispatch(setSortOption(event.target.value));
            }}
            value={sortOption}
            className={styles.sort}
          >
            {sortOptions.map((option) => (
              <option key={option.name} value={option.value}>
                {option.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className={styles.orderBlock}>
          <span className={styles.orderHeader}>Order by</span>
          <Form.Select
            onChange={(event) => {
              dispatch(setSortOrderOption(event.target.value));
            }}
            value={orderOption}
            className={styles.order}
          >
            {orderOptions.map((option) => (
              <option key={option.name} value={option.value}>
                {option.name}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
      <div className={styles.breadcrumbs}>
        <Link
          to="/"
          onClick={() => resetCatalogFilters()}
          className={styles.breadcrumbs_link}
        >
          <HiOutlineHome />
        </Link>
        {categ && (
          <>
            <HiArrowRight className={styles.breadcrumb_arrow} />
            <Link
              to="/catalog"
              onClick={() => resetCatalogFilters()}
              className={styles.breadcrumbs_link}
            >
              Catalog
            </Link>
          </>
        )}
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
      <div className={styles.paginationWrapper}>
        <div className={styles.pagination}>
          {currentPage > 1 && (
            <FaCircleArrowLeft
              className={styles.arrowLeft}
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            />
          )}
          <select
            className={styles.pageNumber}
            name="pageNumber"
            value={currentPage}
            onChange={(event) =>
              dispatch(setCurrentPage(parseInt(event.target.value, 10)))
            }
          >
            {Array.from(
              { length: Math.ceil(totalProductsNumber / PRODUCTS_LIMIT) },
              (_, i) => i + 1,
            ).map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          {currentPage < totalProductsNumber / PRODUCTS_LIMIT && (
            <FaCircleArrowRight
              className={styles.arrowRight}
              onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            />
          )}
        </div>
      </div>
      {showFilters && (
        <Filters showFilters={showFilters} setShowFilters={setShowFilters} />
      )}
    </div>
  );
}

export default Catalog;
