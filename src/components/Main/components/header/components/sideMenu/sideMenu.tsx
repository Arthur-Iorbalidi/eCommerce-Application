import './sideMenu.scss';

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { BsXLg } from 'react-icons/bs';
import { Store } from '../../../../../../redux/sideMenuReducer';

import NavBar from '../navBar/navBar';
import Button from '../../../../../../shared/ui/Button/Button';

function SideMenu({
  activateSideMenu,
}: {
  activateSideMenu: (data: boolean) => { type: string; data: boolean };
}) {
  const navigate = useNavigate();

  return (
    <div className="main-page_side-menu">
      <BsXLg
        className="main-page_side-menu_close"
        onClick={() => {
          activateSideMenu(false);
        }}
      />
      <div className="main-page_side-menu_wrapper">
        <NavBar position="side" />
        <div className="main-page_header_wrapper-all_buttons side">
          <Button
            value="Sign In"
            color="green"
            className="header-button"
            onClick={() => {
              activateSideMenu(false);
              navigate('login');
            }}
          />
          <Button
            value="Sign Up"
            color="green"
            onClick={() => {
              activateSideMenu(false);
              navigate('registration');
            }}
          />
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state: Store): Store {
  return state;
}

function mapDispatchToProps(
  dispatch: Dispatch<{ type: string; data: boolean }>,
): { activateSideMenu: (data: boolean) => { type: string; data: boolean } } {
  return {
    activateSideMenu: (data: boolean) =>
      dispatch({
        type: 'activateSideMenu',
        data,
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
