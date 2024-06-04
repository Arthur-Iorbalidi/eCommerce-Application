/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from '../Button/Button';
import styles from './FilterComponent.module.scss';

type FilterProps = {
  filterTitle: string;
  allValues: string[];
  activeValues: string[];
  onChangeValue: (value: string, isChecked: boolean) => void;
  onApply: () => void;
  onReset: () => void;
};

const FilterComponent: React.FC<FilterProps> = ({
  filterTitle,
  allValues,
  activeValues,
  onChangeValue,
  onApply,
  onReset,
}) => {
  const [localSelectedValues, setLocalSelectedValues] =
    useState<string[]>(activeValues);

  useEffect(() => {
    if (activeValues.length === 0) {
      setLocalSelectedValues([]);
    }
  }, [activeValues]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (localSelectedValues.includes(value)) {
      setLocalSelectedValues(localSelectedValues.filter((v) => v !== value));
    } else {
      setLocalSelectedValues([...localSelectedValues, value]);
    }
    onChangeValue(value, event.target.checked);
  };

  return (
    <div className={styles.filter_container}>
      <div className={styles.filter_title}>{filterTitle}</div>
      {allValues.length > 0 ? (
        <>
          <Form className={styles.filter_list}>
            {allValues.map((value) => (
              <Form.Check
                className={styles.filter_item}
                type="checkbox"
                key={value}
                value={value}
                id={`filter-${value}`}
                label={value}
                checked={localSelectedValues.includes(value)}
                onChange={handleCheckboxChange}
              />
            ))}
          </Form>
          <div className={styles.filter_btns}>
            <Button
              className={styles.apply_btn}
              value="Apply"
              color="green"
              onClick={onApply}
            />
            <Button
              className={styles.reset_btn}
              value="Reset"
              color="green"
              onClick={onReset}
            />
          </div>
        </>
      ) : (
        <p className={styles.notFound_message}>Not found</p>
      )}
    </div>
  );
};

export default FilterComponent;
