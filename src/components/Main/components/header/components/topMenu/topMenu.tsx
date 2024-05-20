import './topMenu.scss';

import { useNavigate } from 'react-router-dom';

import NavBar from '../navBar/navBar';
import Button from '../../../../../../shared/ui/Button/Button';
import useAppSelector from '../../../../../../shared/hooks/useAppSelector';

interface Props {
  position: 'top' | 'side';
}

export default function TopMenu({ position }: Props) {
  const navigate = useNavigate();

  const authorizationState = useAppSelector(
    (state) => state.authorizationStateReducer.isAuthorized,
  );

  return (
    <div className="main-page_header_wrapper">
      <NavBar position={position} />
      <div className={`main-page_header_wrapper-all_buttons ${position}`}>
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
      </div>
    </div>
  );
}
