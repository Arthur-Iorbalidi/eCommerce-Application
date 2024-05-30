import './main.scss';

import { Routes, Route, Navigate } from 'react-router-dom';

import Registration from '../Registration/registration';
import Header from './components/header/header';
import Login from '../Login/login';
import Account from '../Account/Account';

import useAppSelector from '../../shared/hooks/useAppSelector';

export default function Main() {
  const authorizationState = useAppSelector(
    (state) => state.authorizationStateReducer.isAuthorized,
  );

  return (
    <div data-testid="main" className="main-page">
      <Header />
      <Routes>
        <Route index element={<div>Main</div>} />
        <Route path="catalog" element={<div>Catalog</div>} />
        <Route path="about-us" element={<div>Amogus</div>} />

        <Route
          path="account"
          element={authorizationState ? <Account /> : <Navigate to="error" />}
        />
        <Route path="purchases" element={<div>purchases</div>} />
        <Route path="*" element={<Navigate to="error" />} />
      </Routes>
    </div>
  );
}
