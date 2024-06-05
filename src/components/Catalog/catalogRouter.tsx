import { Route, Routes } from 'react-router-dom';

import Catalog from './catalog';
import ProductPage from '../Product/product';

export default function CatalogRouter() {
  return (
    <Routes>
      <Route index element={<Catalog />} />
      <Route path="/product/:key" element={<ProductPage />} />
      <Route path="/:categ/*" element={<Catalog />} />
      <Route path="/:categ/product/:key" element={<ProductPage />} />
    </Routes>
  );
}
