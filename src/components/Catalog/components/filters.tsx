import Offcanvas from 'react-bootstrap/Offcanvas';
import { useEffect, useState } from 'react';
import Categories from './components/categories/categories';
import PriceRange from './components/priceRange/priceRange';
import Button from '../../../shared/ui/Button/Button';
// import Brands from './components/brands/brands';
import useAppDispatch from '../../../shared/hooks/useAppDispatch';
import {
  resetActiveBrands,
  resetActiveCategoryId,
  resetPriceRange,
  setPriceRange,
} from '../../../store/reducers/filtersSlice';
import useAppSelector from '../../../shared/hooks/useAppSelector';

import styles from './filters.module.scss';

interface FiltersProps {
  // brands: string[];
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
}

const Filters: React.FC<FiltersProps> = (props: FiltersProps) => {
  // const { brands, showFilters, setShowFilters } = props;

  const { showFilters, setShowFilters } = props;

  const dispatch = useAppDispatch();
  const priceRange = useAppSelector((state) => state.filtersReducer.priceRange);

  const [inputValues, setInputValues] = useState<number[]>([
    priceRange.min,
    priceRange.max,
  ]);

  const handlePricesApply = () => {
    dispatch(setPriceRange({ min: inputValues[0], max: inputValues[1] }));
  };

  useEffect(() => {
    setInputValues([priceRange.min, priceRange.max]);
  }, [priceRange]);

  const handleFiltersReset = () => {
    dispatch(resetActiveBrands());
    dispatch(resetActiveCategoryId());
    dispatch(resetPriceRange());
    setInputValues([priceRange.min, priceRange.max]);
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
        <PriceRange
          inputValues={inputValues}
          setInputValues={setInputValues}
          onApply={handlePricesApply}
        />
        <hr />
        {/* <Brands brands={brands} />
        <hr /> */}
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
