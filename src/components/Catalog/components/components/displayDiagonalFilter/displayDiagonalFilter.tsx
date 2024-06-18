/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
import useAppSelector from '../../../../../shared/hooks/useAppSelector';
import useAppDispatch from '../../../../../shared/hooks/useAppDispatch';
import {
  resetActiveDisplayDiagonals,
  setActiveDisplayDiagonals,
} from '../../../../../store/reducers/filtersSlice';

import FilterComponent from '../../../../../shared/ui/FilterComponent/FilterComponent';
import { resetCurrentPage } from '../../../../../store/reducers/sortSlice';

const DisplayDiagonalFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const activeDisplayDiagonals = useAppSelector(
    (state) => state.filtersReducer.activeDisplayDiagonals,
  );
  const allDisplayDiagonals = useAppSelector(
    (state) => state.filtersReducer.displayDiagonals,
  );

  const [localSelectedDiagonals, setLocalSelectedDiagonals] = useState<
    string[]
  >(activeDisplayDiagonals);

  useEffect(() => {
    if (activeDisplayDiagonals.length === 0) {
      setLocalSelectedDiagonals([]);
    }
  }, [activeDisplayDiagonals]);

  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setLocalSelectedDiagonals([...localSelectedDiagonals, value]);
    } else {
      setLocalSelectedDiagonals(
        localSelectedDiagonals.filter((diagonal) => diagonal !== value),
      );
    }
  };

  const handleApplyDisplayDiagonalFilter = () => {
    dispatch(setActiveDisplayDiagonals(localSelectedDiagonals));
    dispatch(resetCurrentPage());
  };

  const handleResetDisplayDiagonalFilter = () => {
    dispatch(resetActiveDisplayDiagonals());
    dispatch(resetCurrentPage());
  };

  return (
    <FilterComponent
      filterTitle="Display diagonal:"
      allValues={allDisplayDiagonals}
      activeValues={activeDisplayDiagonals}
      onChangeValue={handleCheckboxChange}
      onApply={handleApplyDisplayDiagonalFilter}
      onReset={handleResetDisplayDiagonalFilter}
    />
  );
};

export default DisplayDiagonalFilter;
