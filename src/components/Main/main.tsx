import './main.scss';

import { Navigate, Routes, Route } from 'react-router-dom';

import Header from './components/header/header';
import Account from '../Account/Account';

import CatalogRouter from '../Catalog/catalogRouter';
import Purchases from '../Purchases/purchases';

export default function Main() {
  // const authorizationState = useAppSelector(
  //   (state) => state.authorizationStateReducer.isAuthorized,
  // );

  return (
    <div data-testid="main" className="main-page">
      <Header />
      <Routes>
        <Route index element={<div>Main</div>} />
        <Route path="catalog/*" element={<CatalogRouter />} />

        <Route path="about-us" element={<div>Amogus</div>} />

        <Route path="account" element={<Account />} />

        <Route path="purchases" element={<Purchases />} />

        <Route path="*" element={<Navigate to="error" />} />
      </Routes>
    </div>
  );
}
