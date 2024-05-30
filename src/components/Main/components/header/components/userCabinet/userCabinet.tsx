import { useState } from 'react';
import './userCabinet.scss';

import { useNavigate } from 'react-router-dom';
import { BsFillPersonFill, BsBasket2 } from 'react-icons/bs';
import { BiLogOut, BiLogIn } from 'react-icons/bi';
import { FaAddressCard } from 'react-icons/fa';
import { Customer } from '@commercetools/platform-sdk';
import checkToken from '../../../../../../services/api/auth/checkToken';
import useAppSelector from '../../../../../../shared/hooks/useAppSelector';
import useAppDispatch from '../../../../../../shared/hooks/useAppDispatch';
import {
  activateAuthorizationState,
  changeUserInfo,
} from '../../../../../../store/reducers/authorizationState';

export default function UserCabinet() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showCabinet, changeShowCabinet] = useState(false);
  // const userInfo = useSelector(
  //   (state) => state.authorizationStateReducer.userInfo
  // );

  const authorizationState = useAppSelector(
    (state) => state.authorizationStateReducer.isAuthorized,
  );

  function authCheckCallback(value: boolean, userInfo: Customer | null) {
    if (!value) {
      navigate('/');
    }
    dispatch(activateAuthorizationState(value));
    dispatch(changeUserInfo(userInfo));
  }

  return (
    <div className="main-page_header_wrapper_userCabinet">
      <div
        className="main-page_header_wrapper_userCabinet_wrap"
        onClick={() => changeShowCabinet((state) => !state)}
      >
        <div className="main-page_header_wrapper_userCabinet_wrap_icon">
          <BsFillPersonFill className="userIcon" viewBox="0 0 15 15" />
        </div>
        <div className="main-page_header_wrapper_userCabinet_wrap_name">
          {/* <p>{userInfo.firstName}</p> */}
          {/* <p>{userInfo.lastName}</p> */}
        </div>
      </div>

      {showCabinet ? (
        <div
          className="main-page_header_wrapper_userCabinet_userInfoNav"
          onClick={() => changeShowCabinet(false)}
        >
          <hr style={{ width: '100%', margin: '0' }} />
          {authorizationState ? (
            <div
              className="main-page_header_wrapper_userCabinet_userInfoNav_button"
              onClick={() => navigate('/account')}
            >
              <FaAddressCard />
              <p>Account</p>
            </div>
          ) : null}
          <div
            className="main-page_header_wrapper_userCabinet_userInfoNav_button"
            onClick={() => navigate('/purchases')}
          >
            <BsBasket2 />
            <p>Purchases</p>
          </div>
          <hr style={{ width: '100%', margin: '0' }} />
          {authorizationState ? (
            <div
              className="main-page_header_wrapper_userCabinet_userInfoNav_button"
              onClick={() => {
                localStorage.removeItem('token');
                checkToken(authCheckCallback);
              }}
            >
              <BiLogOut />
              <p>Log out</p>
            </div>
          ) : (
            <div
              className="main-page_header_wrapper_userCabinet_userInfoNav_button"
              onClick={() => {
                navigate('login');
              }}
            >
              <BiLogIn />
              <p>Log In</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
