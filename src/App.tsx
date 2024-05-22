import './App.scss';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './components/Main/main';
import Error from './components/Error/Error';
// api
// import { getTokenZero } from './services/api/actions';
import checkToken from './services/api/actions/checkToken';
import useAppDispatch from './shared/hooks/useAppDispatch';
import { activateAuthorizationState } from './store/reducers/authorizationState';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function authCheckCallback(value: boolean) {
      dispatch(activateAuthorizationState(value));
    }
    checkToken(authCheckCallback);
  }, [dispatch]);

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
