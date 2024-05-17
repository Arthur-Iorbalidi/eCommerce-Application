import './sideMenu.scss';

import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { BsXLg } from 'react-icons/bs';
import { SideMenuReducerType } from '../../../../../../redux/sideMenuReducer';

import NavBar from '../navBar/navBar';
import Button from '../../../../../../shared/ui/Button/Button';

interface Props {
  activateSideMenu: (data: boolean) => { type: string; data: boolean };
}
type DispatchType = Dispatch<{ type: string; data: boolean }>;
type MapDispatch = {
  activateSideMenu: (data: boolean) => { type: string; data: boolean };
};

function SideMenu({ activateSideMenu }: Props) {
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

function mapStateToProps(state: SideMenuReducerType): SideMenuReducerType {
  return state;
}

function mapDispatchToProps(dispatch: DispatchType): MapDispatch {
  return {
    activateSideMenu: (data: boolean) =>
      dispatch({
        type: 'activateSideMenu',
        data,
      }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
