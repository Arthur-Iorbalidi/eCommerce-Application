import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './components/Main/main';
import Error from './components/Error/Error';

function App() {
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
