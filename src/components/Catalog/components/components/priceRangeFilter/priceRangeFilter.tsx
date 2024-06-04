/* eslint-disable @typescript-eslint/no-shadow */
import ReactSlider from 'react-slider';
import Button from '../../../../../shared/ui/Button/Button';

import styles from './priceRangeFilter.module.scss';

export const enum PriceRanges {
  MIN = 1,
  MAX = 5000,
}

interface PriceRangeFilterProps {
  inputValues: number[];
  setInputValues: (values: number[]) => void;
  onApply: () => void;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = (
  props: PriceRangeFilterProps,
) => {
  const { inputValues, setInputValues, onApply } = props;

  return (
    <>
      <div className={styles.prices_title}> Prices:</div>
      <ReactSlider
        value={inputValues}
        onAfterChange={(newValue) => {
          setInputValues(newValue);
        }}
        className={styles.horizontal_slider}
        thumbClassName={styles.slider_thumb}
        trackClassName={styles.slider_track}
        min={PriceRanges.MIN}
        max={PriceRanges.MAX}
        renderThumb={(props, state) => (
          <div
            className={`thumb_${state.index} ${styles.thumb}`}
            {...props}
            key={state.index}
          >
            {state.valueNow}
          </div>
        )}
        pearling
        minDistance={0}
      />

      <Button
        className={styles.apply_btn}
        value="Apply"
        color="green"
        onClick={onApply}
      />
    </>
  );
};

export default PriceRangeFilter;
