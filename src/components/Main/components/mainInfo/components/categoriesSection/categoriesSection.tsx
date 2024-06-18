import { Category } from '@commercetools/platform-sdk';

import { Link } from 'react-router-dom';

import useAppDispatch from '../../../../../../shared/hooks/useAppDispatch';
import { setActiveCategoryId } from '../../../../../../store/reducers/filtersSlice';

import styles from './categoriesSection.module.scss';

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = (
  props: CategoriesSectionProps,
) => {
  const { categories } = props;

  const dispatch = useAppDispatch();

  return (
    <section className={styles.categories_section}>
      <h2>Find your favorite device</h2>
      <div className={styles.category_list}>
        {categories.map((category) => (
          <Link
            className={styles.category_list_link}
            to={`/catalog/${category.externalId}`}
            key={category.externalId}
            onClick={() => dispatch(setActiveCategoryId(category.id))}
          >
            <img
              alt={category.externalId}
              src={category.assets![0].sources[0].uri}
            />
            <div className={styles.category_item}>{category.name.en}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
