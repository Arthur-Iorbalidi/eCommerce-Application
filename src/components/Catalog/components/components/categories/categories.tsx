import ListGroup from 'react-bootstrap/ListGroup';
import useAppSelector from '../../../../../shared/hooks/useAppSelector';
import { setActiveCategoryId } from '../../../../../store/reducers/filtersSlice';
import useAppDispatch from '../../../../../shared/hooks/useAppDispatch';

import styles from './categories.module.scss';

const Categories = () => {
  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.filtersReducer.categories);
  const activeCategory = useAppSelector(
    (state) => state.filtersReducer.activeCategoryId,
  );

  const handleCategoryClick = (categoryId: string) => {
    if (activeCategory !== categoryId) {
      dispatch(setActiveCategoryId(categoryId));
    }
  };

  return (
    <div className={styles.categories}>
      <div className={styles.categories_title}>Categories</div>
      <ListGroup className={styles.categories_list} variant="flush">
        {categories.map((category) => (
          <ListGroup.Item
            className={`${styles.category} ${activeCategory === category.id ? styles.active : ''}`}
            variant="light"
            key={category.id}
            action
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.name.en}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Categories;
