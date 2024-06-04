import './sideMenu.scss';

import { BsXLg } from 'react-icons/bs';

import { useNavigate } from 'react-router-dom';
import useAppDispatch from '../../../../../../shared/hooks/useAppDispatch';
import { activateSideMenu } from '../../../../../../store/reducers/sideMenuSlice';
import useAppSelector from '../../../../../../shared/hooks/useAppSelector';
import { activateAuthorizationState } from '../../../../../../store/reducers/authorizationSlice';

import NavBar from '../navBar/navBar';
import Button from '../../../../../../shared/ui/Button/Button';

export default function SideMenu() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authorizationState = useAppSelector(
    (state) => state.authorizationStateReducer.isAuthorized,
  );

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
        <div className="main-page_header_wrapper-all_buttons side">
          {!authorizationState ? (
            <>
              <Button
                value="Sign In"
                color="green"
                className="header-button"
                onClick={() => {
                  dispatch(activateSideMenu(false));
                  navigate('login');
                }}
              />
              <Button
                value="Sign Up"
                color="green"
                onClick={() => {
                  dispatch(activateSideMenu(false));
                  navigate('registration');
                }}
              />
            </>
          ) : (
            <Button
              value="Logout"
              color="green"
              className="header-button"
              onClick={() => {
                dispatch(activateSideMenu(false));
                dispatch(activateAuthorizationState(false));
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
