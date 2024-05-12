import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './components/Main/main';
import Error from './components/Error/Error';

import Registration from './components/Registration/registration';
import Login from './components/Login/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
