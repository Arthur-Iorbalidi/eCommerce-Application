import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Main from './components/Main/main';
import Error from './components/Error/Error';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/*" element={<Main />} />

        <Route path="*" element={<Navigate to="/error" />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
