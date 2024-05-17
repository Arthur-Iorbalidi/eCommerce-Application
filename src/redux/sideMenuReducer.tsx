enum Types {
  activateSideMenu = 'activateSideMenu',
}

const store: { showSideMenu: boolean } = {
  showSideMenu: true,
};

export interface SideMenuReducerType {
  state: typeof store;
  action: {
    type: Types.activateSideMenu;
    data: boolean;
  };
}

export default function sideMenuReducer(
  state: typeof store = store,
  action: {
    type: Types.activateSideMenu;
    data: boolean;
  },
): typeof store {
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
