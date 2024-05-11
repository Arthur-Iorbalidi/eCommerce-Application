import './main.scss';

import { Routes, Route, Navigate } from 'react-router-dom';

import Registration from '../Registration/registration';
import Header from './components/header/header';
import Login from '../Login/login';

function Main() {
  return (
    <div className="main-page">
      <Header />
      <Routes>
        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<Login />} />
        <Route path="*/*" element={<Navigate to="/error" />} />
      </Routes>
    </div>
  );
}

export default Main;
