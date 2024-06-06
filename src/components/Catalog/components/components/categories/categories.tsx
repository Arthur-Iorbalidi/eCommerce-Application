import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

import useAppSelector from '../../../../../shared/hooks/useAppSelector';
import useAppDispatch from '../../../../../shared/hooks/useAppDispatch';
import {
  resetActiveBrands,
  resetActiveDisplayDiagonals,
  resetActiveOsArray,
  setActiveCategoryId,
} from '../../../../../store/reducers/filtersSlice';

import styles from './categories.module.scss';

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.filtersReducer.categories);
  const activeCategory = useAppSelector(
    (state) => state.filtersReducer.activeCategoryId,
  );

  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory !== categoryId) {
      dispatch(setActiveCategoryId(categoryId));
      dispatch(resetActiveBrands());
      dispatch(resetActiveOsArray());
      dispatch(resetActiveDisplayDiagonals());
    }
  };

  return (
    <div className={styles.categories}>
      <div className={styles.categories_title}>Categories:</div>
      <ListGroup className={styles.categories_list} variant="flush">
        {categories.map((category) => (
          <Link
            to={`/catalog/${category.externalId}`}
            className={styles.category_link}
          >
            <ListGroup.Item
              className={`${styles.category} ${activeCategory === category.id ? styles.active : ''}`}
              variant="light"
              key={category.id}
              action
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name.en}
            </ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
};

export default Categories;
