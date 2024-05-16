import './header.scss';
import { useEffect } from 'react';

import { Link } from 'react-router-dom';
import { BsList } from 'react-icons/bs';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import useWindowWidth from '../../../../shared/hooks/useWindowWidth';

import logo from '../../../../assets/images/MainPage/Header/logo.svg';
import TopMenu from './components/topMenu/topMenu';
import SideMenu from './components/sideMenu/sideMenu';
import { Store } from '../../../../redux/sideMenuReducer';

interface Props {
  sideMenuReducer?: {
    showSideMenu: boolean;
  };
  activateSideMenu: (data: boolean) => void;
}

function Header({ sideMenuReducer, activateSideMenu }: Props) {
  const currentWindowWidth = useWindowWidth();
  const statusSideMenu = sideMenuReducer ? sideMenuReducer.showSideMenu : null;

  useEffect(() => {
    if (currentWindowWidth > 768) {
      activateSideMenu(false);
    }
  }, [currentWindowWidth, activateSideMenu]);

  return (
    <div className="main-page_header">
      {statusSideMenu ? <SideMenu /> : null}

      <div className="main-page_header_wrapper-all">
        <Link to="/" className="main-page_header_wrapper_logo">
          <img alt="logo" src={logo} />
        </Link>

        {currentWindowWidth >= 768 ? (
          <TopMenu position="top" />
        ) : (
          <BsList
            className="burgerMenu"
            onClick={() => {
              activateSideMenu(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

function mapStateToProps(state: Store): Store {
  return state;
}

function mapDispatchToProps(
  dispatch: Dispatch<{ type: string; data: boolean }>,
): { activateSideMenu: (data: boolean) => void } {
  return {
    activateSideMenu: (data: boolean) =>
      dispatch({
        type: 'activateSideMenu',
        data,
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
