import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Customer } from '@commercetools/platform-sdk';
import useAppDispatch from '../../shared/hooks/useAppDispatch';
import {
  activateAuthorizationState,
  changeUserInfo,
} from '../../store/reducers/authorizationSlice';
import UserMainInfo from './Components/userMainInfo/userMainInfo';
import UserPassword from './Components/userPassword/userPassword';
import checkToken from '../../services/api/auth/checkToken';

import styles from './Account.module.scss';

function Account() {
  const [authState, changeAuthState] = React.useState<boolean | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    function authCheckCallback(value: boolean, userInfo: Customer | null) {
      dispatch(activateAuthorizationState(value));
      dispatch(changeUserInfo(userInfo));
      changeAuthState(value);
    }
    checkToken(authCheckCallback);
  });

  if (authState === true) {
    return (
      <div className={styles.account_container}>
        <UserMainInfo />
        <UserPassword />
      </div>
    );
  }
  if (authState === false) {
    return <Navigate to="/" />;
  }
}

export default Account;
