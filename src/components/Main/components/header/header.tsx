import './header.scss';
import { Link, useNavigate } from 'react-router-dom';

import NavBar from './components/navBar/navBar';
import Button from '../../../../shared/ui/Button/Button';
import logo from '../../../../assets/images/MainPage/Header/logo.svg';

function Header() {
  // const currentRoute = window.location.pathname;
  const navigate = useNavigate();
  return (
    <div className="main-page_header">
      <div className="main-page_header_wrapper-all">
        <div className="main-page_header_wrapper">
          <Link to="/" className="main-page_header_wrapper_logo">
            <img alt="logo" src={logo} />
          </Link>
          <NavBar />
        </div>

        <div className="main-page_header_wrapper-all_buttons">
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
    </div>
  );
}

export default Header;
