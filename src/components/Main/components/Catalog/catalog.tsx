import { useEffect, useState } from 'react';
import {
  ClientResponse,
  ProductPagedQueryResponse,
  Product,
} from '@commercetools/platform-sdk';
import styles from './catalog.module.scss';
import getProductsZero from '../../../../services/api/products/getProducts_zero';
import ProductItem from '../../../../shared/ui/Product/productItem';
import Button from '../../../../shared/ui/Button/Button';

function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  function showProducts(value: ClientResponse<ProductPagedQueryResponse>) {
    setProducts(value.body.results);
  }

  useEffect(() => {
    getProductsZero(showProducts);
  }, []);

  return (
    <div className={styles.catalog}>
      <div className={styles.search}>
        <Button className={styles.filterBtn} value="Filter" color="green" />
        <input className={styles.input} type="text" placeholder="Search" />
        <Button className={styles.searchBtn} value="Search" color="green" />
      </div>
      <div className={styles.productList}>
        {products.map((product) => (
          <ProductItem key={product.id} value={product} />
        ))}
      </div>
    </div>
  );
}

export default Catalog;
