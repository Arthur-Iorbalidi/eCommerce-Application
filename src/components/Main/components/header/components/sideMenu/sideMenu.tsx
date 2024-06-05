import './sideMenu.scss';

import { BsXLg, BsBasket2 } from 'react-icons/bs';
import { Customer } from '@commercetools/platform-sdk';

import { useNavigate } from 'react-router-dom';
import { BiLogOut, BiLogIn } from 'react-icons/bi';
import { FaAddressCard } from 'react-icons/fa';

import { activateSideMenu } from '../../../../../../store/reducers/sideMenuSlice';
import useAppSelector from '../../../../../../shared/hooks/useAppSelector';
import useAppDispatch from '../../../../../../shared/hooks/useAppDispatch';

import NavBar from '../navBar/navBar';
import checkToken from '../../../../../../services/api/auth/checkToken';

import {
  activateAuthorizationState,
  changeUserInfo,
} from '../../../../../../store/reducers/authorizationSlice';

export default function SideMenu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    <div className="main-page_side-menu">
      <BsXLg
        className="main-page_side-menu_close"
        onClick={() => {
          dispatch(activateSideMenu(false));
        }}
      />
      <div className="main-page_side-menu_wrapper">
        <NavBar position="side" />

        {authorizationState ? (
          <div
            className="main-page_header_wrapper_userCabinet_userInfoNav_button side"
            onClick={() => {
              dispatch(activateSideMenu(false));
              navigate('/account');
            }}
          >
            <FaAddressCard />
            <p>Account</p>
          </div>
        ) : null}
        <div
          className="main-page_header_wrapper_userCabinet_userInfoNav_button side"
          onClick={() => {
            dispatch(activateSideMenu(false));
            navigate('/purchases');
          }}
        >
          <BsBasket2 />
          <p>Purchases</p>
        </div>
        {authorizationState ? (
          <div
            className="main-page_header_wrapper_userCabinet_userInfoNav_button side"
            onClick={() => {
              dispatch(activateSideMenu(false));
              localStorage.removeItem('token');
              checkToken(authCheckCallback);
            }}
          >
            <BiLogOut />
            <p>Log out</p>
          </div>
        ) : (
          <div
            className="main-page_header_wrapper_userCabinet_userInfoNav_button side"
            onClick={() => {
              dispatch(activateSideMenu(false));
              navigate('login');
            }}
          >
            <BiLogIn />
            <p>Log In</p>
          </div>
        )}
      </div>
    </div>
  );
}
