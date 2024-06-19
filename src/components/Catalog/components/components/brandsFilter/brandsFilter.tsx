/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';

import useAppSelector from '../../../../../shared/hooks/useAppSelector';
import useAppDispatch from '../../../../../shared/hooks/useAppDispatch';
import {
  resetActiveBrands,
  setActiveBrands,
} from '../../../../../store/reducers/filtersSlice';

import FilterComponent from '../../../../../shared/ui/FilterComponent/FilterComponent';
import { resetCurrentPage } from '../../../../../store/reducers/sortSlice';

const BrandsFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const activeBrands = useAppSelector(
    (state) => state.filtersReducer.activeBrands,
  );
  const allBrands = useAppSelector((state) => state.filtersReducer.brands);

  const [localSelectedBrands, setLocalSelectedBrands] =
    useState<string[]>(activeBrands);

  useEffect(() => {
    if (activeBrands.length === 0) {
      setLocalSelectedBrands([]);
    }
  }, [activeBrands]);

  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setLocalSelectedBrands([...localSelectedBrands, value]);
    } else {
      setLocalSelectedBrands(
        localSelectedBrands.filter((brand) => brand !== value),
      );
    }
  };

  const handleApplyBrandsFilter = () => {
    dispatch(setActiveBrands(localSelectedBrands));
    dispatch(resetCurrentPage());
  };

  const handleResetBrandsFilter = () => {
    dispatch(resetActiveBrands());
    dispatch(resetCurrentPage());
  };

  return (
    <FilterComponent
      filterTitle="Brands:"
      allValues={allBrands}
      activeValues={activeBrands}
      onChangeValue={handleCheckboxChange}
      onApply={handleApplyBrandsFilter}
      onReset={handleResetBrandsFilter}
    />
  );
};

export default BrandsFilter;
