/* eslint-disable operator-linebreak */
import { Link } from 'react-router-dom';

import useAppDispatch from '../../../../../../shared/hooks/useAppDispatch';
import { setActiveBrands } from '../../../../../../store/reducers/filtersSlice';

import styles from './brandsSection.module.scss';

interface BrandsSectionProps {
  brands: string[];
}

const BrandsSection: React.FC<BrandsSectionProps> = (
  props: BrandsSectionProps,
) => {
  const { brands } = props;

  const dispatch = useAppDispatch();

  return (
    <section className={styles.brands_section}>
      <h2>Brands</h2>
      <div className={styles.brands_list}>
        {brands &&
          brands.map((brand) => {
            return (
              <Link
                className={styles.brand_list_link}
                to="/catalog"
                key={brand}
                onClick={() => dispatch(setActiveBrands([brand]))}
              >
                <div className={styles.brand_item} key={brand}>
                  {brand}
                </div>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default BrandsSection;
