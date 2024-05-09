import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import Registration from './components/Registration/registration';
import Login from './components/Login/login';
import Main from './components/Main/main';
import Error from './components/Error/Error';

function App() {
  const [authState, changeAuthState] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route path="*" element={<Navigate to="/error" />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
