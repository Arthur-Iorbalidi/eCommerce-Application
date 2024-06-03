import { useEffect, useState } from 'react';
import {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import styles from './catalog.module.scss';
import getProducts from '../../services/api/products/getProducts';
import Button from '../../shared/ui/Button/Button';
import ProductItem from '../../shared/ui/ProductItem/productItem';
import Loader from '../../shared/ui/Loader/loader';
import { orderOptions, sortOptions } from './sortOptions';

function Catalog() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState<ProductProjection[]>([]);

  function showProducts(
    value: ClientResponse<ProductProjectionPagedSearchResponse>,
  ) {
    setProducts(value.body.results);
    setIsLoading(false);
  }

  const navigateToProduct = (productKey: string) => {
    navigate(`product/${productKey}`);
  };

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

  useEffect(() => {
    setIsLoading(true);
    getProducts(showProducts, 100, sortOption, orderOption, searchText);
  }, [sortOption, orderOption, searchText]);

  return (
    <div className={styles.catalog}>
      <div className={styles.search}>
        <Button className={styles.filterBtn} value="Filter" color="green" />
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

      <div className={styles.productList}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            value={product}
            onClick={() => navigateToProduct(product.key!)}
          />
        ))}
      </div>

      {isLoading && (
        <div className={styles.loader_container}>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Catalog;
