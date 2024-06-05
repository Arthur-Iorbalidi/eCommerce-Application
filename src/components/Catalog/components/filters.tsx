import Offcanvas from 'react-bootstrap/Offcanvas';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Categories from './components/categories/categories';
import PriceRangeFilter from './components/priceRangeFilter/priceRangeFilter';
import BrandsFilter from './components/brandsFilter/brandsFilter';
import OsFilter from './components/osFilter/osFilter';
import DisplayDiagonalFilter from './components/displayDiagonalFilter/displayDiagonalFilter';
import Button from '../../../shared/ui/Button/Button';

import useAppDispatch from '../../../shared/hooks/useAppDispatch';
import useAppSelector from '../../../shared/hooks/useAppSelector';
import {
  resetActiveBrands,
  resetActiveCategoryId,
  resetActiveDisplayDiagonals,
  resetActiveOsArray,
  resetPriceRange,
  setPriceRange,
} from '../../../store/reducers/filtersSlice';

import styles from './filters.module.scss';

interface FiltersProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const Filters: React.FC<FiltersProps> = (props: FiltersProps) => {
  const navigate = useNavigate();
  const { showFilters, setShowFilters } = props;

  const dispatch = useAppDispatch();

  const priceRange = useAppSelector((state) => state.filtersReducer.priceRange);

  const [inputValues, setInputValues] = useState<number[]>([
    priceRange.min,
    priceRange.max,
  ]);

  useEffect(() => {
    setInputValues([priceRange.min, priceRange.max]);
  }, [priceRange]);

  const handlePricesApply = () => {
    dispatch(setPriceRange({ min: inputValues[0], max: inputValues[1] }));
  };

  const handleFiltersReset = () => {
    dispatch(resetActiveCategoryId());
    dispatch(resetPriceRange());
    setInputValues([priceRange.min, priceRange.max]);
    dispatch(resetActiveBrands());
    dispatch(resetActiveOsArray());
    dispatch(resetActiveDisplayDiagonals());
    navigate('/catalog');
  };

  return (
    <Offcanvas
      className={styles.offcanvas}
      backdrop
      show={showFilters}
      onHide={() => setShowFilters(false)}
    >
      <Offcanvas.Header className={styles.offcanvas_header} closeButton>
        <Offcanvas.Title className={styles.offcanvas_title}>
          Filters
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={styles.offcanvas_body}>
        <hr />
        <Categories />
        <hr />
        <PriceRangeFilter
          inputValues={inputValues}
          setInputValues={setInputValues}
          onApply={handlePricesApply}
        />
        <hr />
        <BrandsFilter />
        <hr />
        <OsFilter />
        <hr />
        <DisplayDiagonalFilter />
        <hr />
        <Button
          className={styles.filters_reset_btn}
          value="Reset"
          color="green"
          onClick={handleFiltersReset}
        />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Filters;
