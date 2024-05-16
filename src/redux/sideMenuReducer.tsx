enum Types {
  activateSideMenu = 'activateSideMenu',
}

export interface Store {
  showSideMenu: boolean;
}

interface Action {
  type: Types.activateSideMenu;
  data: boolean;
}

const store: Store = {
  showSideMenu: true,
};

export default function sideMenuReducer(
  state: Store = store,
  action: Action,
): Store {
  switch (action.type) {
    case 'activateSideMenu':
      return {
        ...state,
        showSideMenu: action.data,
      };
    default:
      return state;
  }
}
