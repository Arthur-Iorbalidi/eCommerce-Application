/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';

import useAppSelector from '../../../../../shared/hooks/useAppSelector';
import useAppDispatch from '../../../../../shared/hooks/useAppDispatch';
import {
  resetActiveOsArray,
  setActiveOsArray,
} from '../../../../../store/reducers/filtersSlice';

import FilterComponent from '../../../../../shared/ui/FilterComponent/FilterComponent';

const OsFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const activeOsArray = useAppSelector(
    (state) => state.filtersReducer.activeOsArray,
  );
  const allOsArray = useAppSelector((state) => state.filtersReducer.osArray);

  const [localSelectedOs, setLocalSelectedOs] =
    useState<string[]>(activeOsArray);

  useEffect(() => {
    if (activeOsArray.length === 0) {
      setLocalSelectedOs([]);
    }
  }, [activeOsArray]);

  const handleCheckboxChange = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setLocalSelectedOs([...localSelectedOs, value]);
    } else {
      setLocalSelectedOs(localSelectedOs.filter((os) => os !== value));
    }
  };

  const handleApplyOsFilter = () => {
    dispatch(setActiveOsArray(localSelectedOs));
  };

  const handleResetOsFilter = () => {
    dispatch(resetActiveOsArray());
  };

  return (
    <FilterComponent
      filterTitle="OS:"
      allValues={allOsArray}
      activeValues={activeOsArray}
      onChangeValue={handleCheckboxChange}
      onApply={handleApplyOsFilter}
      onReset={handleResetOsFilter}
    />
  );
};

export default OsFilter;
