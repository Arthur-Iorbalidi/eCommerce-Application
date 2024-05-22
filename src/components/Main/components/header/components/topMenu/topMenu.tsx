import './topMenu.scss';

import { useNavigate } from 'react-router-dom';
import useAppSelector from '../../../../../../shared/hooks/useAppSelector';
import useAppDispatch from '../../../../../../shared/hooks/useAppDispatch';
import { activateAuthorizationState } from '../../../../../../store/reducers/authorizationState';

import NavBar from '../navBar/navBar';
import Button from '../../../../../../shared/ui/Button/Button';
import checkToken from '../../../../../../services/api/actions/checkToken';

interface Props {
  position: 'top' | 'side';
}

export default function TopMenu({ position }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authorizationState = useAppSelector(
    (state) => state.authorizationStateReducer.isAuthorized,
  );

  function authCheckCallback(value: boolean) {
    dispatch(activateAuthorizationState(value));
  }

  return (
    <div className="main-page_header_wrapper">
      <NavBar position={position} />
      <div className={`main-page_header_wrapper-all_buttons ${position}`}>
        {!authorizationState ? (
          <>
            <Button
              value="Sign In"
              color="green"
              className="header-button"
              onClick={() => {
                navigate('login');
              }}
            />
            <Button
              value="Sign Up"
              color="green"
              onClick={() => {
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
              localStorage.removeItem('token');
              checkToken(authCheckCallback);
            }}
          />
        )}
      </div>
    </div>
  );
}
