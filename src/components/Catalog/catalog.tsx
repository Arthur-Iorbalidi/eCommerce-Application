import { useEffect, useState } from 'react';
import {
  ClientResponse,
  ProductPagedQueryResponse,
  Product,
} from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import styles from './catalog.module.scss';
import getProductsZero from '../../services/api/products/getProducts_zero';
import Button from '../../shared/ui/Button/Button';
import ProductItem from '../../shared/ui/ProductItem/productItem';
import Loader from '../../shared/ui/Loader/loader';

function Catalog() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);

  function showProducts(value: ClientResponse<ProductPagedQueryResponse>) {
    setProducts(value.body.results);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getProductsZero(showProducts);
  }, []);

  const navigateToProduct = (productKey: string) => {
    navigate(`product/${productKey}`);
  };

  return (
    <div className={styles.catalog}>
      <div className={styles.search}>
        <Button className={styles.filterBtn} value="Filter" color="green" />
        <input className={styles.input} type="text" placeholder="Search" />
        <Button className={styles.searchBtn} value="Search" color="green" />
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
