import './header.scss';

import NavBar from './components/navBar/navBar';
import Button from '../../../../shared/ui/Button/Button';

import logo from '../../../../assets/images/MainPage/Header/logo.png';

function Header() {
  return (
    <div className="main-page_header">
      <div className="main-page_header_wrapper">
        <div className="main-page_header_wrapper_logo">
          <img alt="logo" src={logo} />
        </div>
        <NavBar />
        <div className="main-page_header_wrapper_buttons">
          <Button value="Sign in" color="green" />
          <Button value="Sign up" color="green" />
        </div>
      </div>
    </div>
  );
}

export default Header;
