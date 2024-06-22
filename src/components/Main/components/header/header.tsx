import './header.scss';

import { Link } from 'react-router-dom';
import { BsList } from 'react-icons/bs';

import { useEffect } from 'react';
import useAppDispatch from '../../../../shared/hooks/useAppDispatch';
import useAppSelector from '../../../../shared/hooks/useAppSelector';
import useWindowWidth from '../../../../shared/hooks/useWindowWidth';
import { activateSideMenu } from '../../../../store/reducers/sideMenuSlice';

import logo from '../../../../assets/images/MainPage/Header/logo.svg';
import TopMenu from './components/topMenu/topMenu';
import SideMenu from './components/sideMenu/sideMenu';

export default function Header() {
  const currentWindowWidth = useWindowWidth();
  const dispatch = useAppDispatch();
  const showSideMenu = useAppSelector(
    (state) => state.sideMenuReducer.showSideMenu,
  );

  useEffect(() => {
    if (currentWindowWidth > 768) {
      dispatch(activateSideMenu(false));
    }
  }, [currentWindowWidth, dispatch]);

  return (
    <div data-testid="header" className="main-page_header">
      {showSideMenu ? <SideMenu /> : null}

      <div className="main-page_header_wrapper-all">
        <Link to="/" className="main-page_header_wrapper_logo">
          <img alt="logo" src={logo} />
        </Link>

        {currentWindowWidth >= 768 ? (
          <TopMenu position="top" />
        ) : (
          <BsList
            data-testid="burger_menu"
            className="burgerMenu"
            onClick={() => {
              dispatch(activateSideMenu(true));
            }}
          />
        )}
      </div>
    </div>
  );
}
