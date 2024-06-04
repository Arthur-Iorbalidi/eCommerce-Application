/* eslint-disable @typescript-eslint/no-shadow */
import ReactSlider from 'react-slider';
import styles from './priceRange.module.scss';
import Button from '../../../../../shared/ui/Button/Button';

export const enum PriceRanges {
  MIN = 1,
  MAX = 5000,
}

interface PriceRangeProps {
  inputValues: number[];
  setInputValues: (values: number[]) => void;
  onApply: () => void;
}

const PriceRange: React.FC<PriceRangeProps> = (props: PriceRangeProps) => {
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
          <div {...props} key={state.index}>
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

export default PriceRange;
