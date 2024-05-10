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
        <Button value="button" color="green" />
      </div>
    </div>
  );
}

export default Header;
