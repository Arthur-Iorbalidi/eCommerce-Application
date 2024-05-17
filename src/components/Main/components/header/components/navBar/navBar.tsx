import './navBar.scss';

import { Link, useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import { Dispatch } from 'react';
import { SideMenuReducerType } from '../../../../../../redux/sideMenuReducer';

interface Props {
  position: 'top' | 'side';
  activateSideMenu: (data: boolean) => void;
}

function NavBar({ position, activateSideMenu }: Props) {
  const location = useLocation();
  const currentLocation = location.pathname;

  function routeChecker(value: string) {
    return currentLocation === value ? 'active' : null;
  }

  function positionChecker(): void {
    if (position === 'side') {
      activateSideMenu(false);
    }
  }

  return (
    <div className={`main-page_header_wrapper_header_nav ${position}`}>
      <Link
        to="/"
        onClick={() => {
          positionChecker();
        }}
        className={`main-page_header_wrapper_header_nav_button ${position} ${routeChecker('/')}`}
      >
        Main
      </Link>
      <Link
        to="/catalog"
        onClick={() => {
          positionChecker();
        }}
        className={`main-page_header_wrapper_header_nav_button ${position} ${routeChecker('/catalog')}`}
      >
        Catalog
      </Link>
      <Link
        to="/about-us"
        onClick={() => {
          positionChecker();
        }}
        className={`main-page_header_wrapper_header_nav_button ${position} ${routeChecker('/about-us')}`}
      >
        About us
      </Link>
    </div>
  );
}

function mapStateToProps(state: SideMenuReducerType): SideMenuReducerType {
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
