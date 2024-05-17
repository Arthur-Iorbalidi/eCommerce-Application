import './main.scss';

import { Routes, Route, Navigate } from 'react-router-dom';

import Registration from '../Registration/registration';
import Header from './components/header/header';
import Login from '../Login/login';

export default function Main() {
  return (
    <div className="main-page">
      <Header />
      <Routes>
        <Route index element={<div>Main</div>} />
        <Route path="catalog" element={<div>Catalog</div>} />
        <Route path="about-us" element={<div>Amogus</div>} />
        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="error" />} />
      </Routes>
    </div>
  );
}
