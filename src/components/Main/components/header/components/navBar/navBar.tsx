import './navBar.scss';

import { Link, useLocation } from 'react-router-dom';

import useAppDispatch from '../../../../../../shared/hooks/useAppDispatch';
import useAppSelector from '../../../../../../shared/hooks/useAppSelector';
import { activateSideMenu } from '../../../../../../store/reducers/sideMenuSlice';
import {
  resetCurrentPage,
  resetSortOption,
  resetSortOrderOption,
} from '../../../../../../store/reducers/sortSlice';
import {
  resetActiveBrands,
  resetActiveCategoryId,
  resetActiveDisplayDiagonals,
  resetActiveOsArray,
  resetPriceRange,
} from '../../../../../../store/reducers/filtersSlice';

interface Props {
  position: 'top' | 'side';
}

export default function NavBar({ position }: Props) {
  const location = useLocation();
  const currentLocation = location.pathname;

  const dispatch = useAppDispatch();
  const showSideMenu = useAppSelector(
    (state) => state.sideMenuReducer.showSideMenu,
  );

  function positionChecker(): void {
    if (position === 'side') {
      dispatch(activateSideMenu(!showSideMenu));
    }
  }

  function routeChecker(value: string) {
    return currentLocation === value ? 'active' : null;
  }

  function handleCatalogReset() {
    dispatch(resetActiveCategoryId());
    dispatch(resetActiveBrands());
    dispatch(resetActiveDisplayDiagonals());
    dispatch(resetActiveOsArray());
    dispatch(resetPriceRange());

    dispatch(resetCurrentPage());
    dispatch(resetSortOption());
    dispatch(resetSortOrderOption());
  }

  return (
    <div className={`main-page_header_wrapper_header_nav ${position}`}>
      <Link
        to="/"
        onClick={() => {
          positionChecker();
          handleCatalogReset();
        }}
        className={`main-page_header_wrapper_header_nav_button ${position} ${routeChecker('/')}`}
      >
        Main
      </Link>
      <Link
        to="/catalog"
        onClick={() => {
          positionChecker();
          handleCatalogReset();
        }}
        className={`main-page_header_wrapper_header_nav_button ${position} ${routeChecker('/catalog')}`}
      >
        Catalog
      </Link>
      <Link
        to="/about-us"
        onClick={() => {
          positionChecker();
          handleCatalogReset();
        }}
        className={`main-page_header_wrapper_header_nav_button ${position} ${routeChecker('/about-us')}`}
      >
        About us
      </Link>
    </div>
  );
}
