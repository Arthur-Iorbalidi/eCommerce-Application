import './App.scss';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';

import Main from './components/Main/main';
import Error from './components/Error/Error';
// api
// import { getTokenZero } from './services/api/actions';
import checkToken from './services/api/auth/checkToken';
import useAppDispatch from './shared/hooks/useAppDispatch';
import {
  activateAuthorizationState,
  changeUserInfo,
} from './store/reducers/authorizationState';
import useAppSelector from './shared/hooks/useAppSelector';
import Registration from './components/Registration/registration';
import Login from './components/Login/login';

function App() {
  const dispatch = useAppDispatch();

  const authorizationState = useAppSelector(
    (state) => state.authorizationStateReducer.isAuthorized,
  );

  useEffect(() => {
    function authCheckCallback(value: boolean, userInfo?: Customer | null) {
      dispatch(activateAuthorizationState(value));
      dispatch(changeUserInfo(userInfo));
    }
    checkToken(authCheckCallback);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route
          path="registration"
          element={authorizationState ? <Navigate to="/" /> : <Registration />}
        />
        <Route
          path="login"
          element={authorizationState ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
