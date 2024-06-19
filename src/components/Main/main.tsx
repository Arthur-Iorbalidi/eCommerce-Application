import './main.scss';

import { Navigate, Routes, Route } from 'react-router-dom';

import About from '../About/about';
import Header from './components/header/header';
import Account from '../Account/Account';
import MainInfo from './components/mainInfo/mainInfo';

import CatalogRouter from '../Catalog/catalogRouter';
import Purchases from '../Purchases/purchases';

export default function Main() {
  return (
    <div data-testid="main" className="main-page">
      <Header />
      <div className="main-page_wrapper">
        <Routes>
          <Route index element={<MainInfo />} />
          <Route path="catalog/*" element={<CatalogRouter />} />

          <Route path="about-us" element={<About />} />

          <Route path="account" element={<Account />} />

          <Route path="purchases" element={<Purchases />} />

          <Route path="*" element={<Navigate to="error" />} />
        </Routes>
      </div>
    </div>
  );
}
