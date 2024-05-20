import './App.scss';
// import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './components/Main/main';
import Error from './components/Error/Error';
// api
// import { getTokenZero } from './services/api/actions';

function App() {
  // useEffect(() => {
  //   const storedValue = localStorage.getItem('ct-anonymous-token');
  //   if (!storedValue) {
  //     getTokenZero();
  //   }
  // }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
